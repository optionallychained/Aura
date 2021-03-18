import { InputManager } from '../input';
import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { WebGLRenderer } from '../renderer';
import { ShaderProgram } from '../shader/program';
import { State } from '../state';
import { System } from '../system';
import { Font } from '../text';
import { TextureAtlas } from '../texture';
import { UI } from '../ui';
import { World } from '../world';
import { GameConfig } from './game.config';
import { ProtoGLError } from './protogl.error';

/**
 * Core Game object; instantiated with or without a configuration object as a first step in creating a game
 *
 * Serves as the operational hub for the execution of the game; handles the Canvas, Input, Entities, Text, Systems and States
 *
 * Note: Games are controlled by the Keyboard only by default. See GameConfig#controlScheme for details
 *
 * Game execution begins when *start* is called on a configured Game instance
 *
 * @see GameConfig
 */
export class Game {

    /** Core World; providing utility and management for Entities representing game objects */
    public readonly world: World;

    /** Core Font; providing utility and management for Entities representing strings and characters */
    public readonly font: Font;

    /** Core UI; providing utility and management for Entities representing UI elements */
    public readonly ui: UI;

    /** InputManager for handling all user input */
    public readonly input: InputManager;

    /** Renderer */
    public readonly renderer: WebGLRenderer;

    /** the Canvas to render the game on */
    public readonly canvas: HTMLCanvasElement;

    /** Frame time calculation utilities */
    private frameDelta = 0;
    private lastFrameTime = 0;

    /** Game States, mapped by their name for simple management */
    private readonly states = new Map<string, State>();

    /** Reference to the current game State for frametime execution */
    private currentState: State | undefined;

    /** Game Systems, mapped by their name for simple management */
    private readonly systems = new Map<string, System>();

    /** Generic game data, stored as a Map for relative type-safety */
    private readonly data = new Map<string, unknown>();

    /** Debug data, used if the game is configured with debugMode on */
    private readonly debugData = {
        frameCount: 0,
        fps: ''
    };

    /** Default Canvas dimensions */
    private readonly defaultCanvasDimensions = new Vec2(window.innerWidth, window.innerHeight);

    /** Default ControlScheme */
    private readonly defaultControlScheme: ControlScheme = 'keyboard';

    /** Default background color */
    private readonly defaultBackgroundColor = new Color();

    /** Default Font texture atlas, for configuring the built-in engine Font */
    // TODO move into Font?
    // TODO font should be built into and published with the engine itself...
    private readonly defaultFontAtlas = new TextureAtlas('text', 'res/font.png', 64, 1);

    /** Default Font charset, for configuring the built-in engine Font */
    // TODO move into Font?
    private readonly defaultFontCharset = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
        'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '[', ']', '+', '-', '*', '/', '!', '?', '\'', '"', '#', '£',
        '$', '&', '%', '^', ',', '.', ':', ';', '<', '>', '_', ' ', '~', '~'
    ];

    /**
     * Constructor. Initialise the Canvas, as well as the Renderer, InputManager, World, Font and UI
     *
     * @param config optional configuration
     */
    constructor(private readonly config?: GameConfig) {
        if (config?.canvasId) {
            this.canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;
        }
        else {
            this.canvas = document.createElement('canvas');
            document.body.append(this.canvas);
        }

        this.canvas.width = config?.canvasDimensions?.x ?? this.defaultCanvasDimensions.x;
        this.canvas.height = config?.canvasDimensions?.y ?? this.defaultCanvasDimensions.y;

        this.renderer = new WebGLRenderer(this, config?.backgroundColor ?? this.defaultBackgroundColor);
        this.input = new InputManager(this, config?.controlScheme ?? this.defaultControlScheme);

        this.world = new World({
            game: this,
            textureAtlas: config?.world?.textureAtlas,
            camera: config?.world?.camera,
            dimensions: config?.world?.dimensions ?? new Vec2(this.canvas.width, this.canvas.height),
        });

        this.ui = new UI({
            game: this,
            textureAtlas: config?.ui?.textureAtlas
        });

        // TODO move defaults into Font
        this.font = new Font({
            game: this,
            charset: config?.font?.charset ?? this.defaultFontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaultFontAtlas
        });
    }

    /**
     * Getter for the Canvas' width
     *
     * @returns the width of the Canvas
     */
    public get width(): number {
        return this.canvas.width;
    }

    /**
     * Getter for the Canvas' height
     *
     * @returns the height of the Canvas
     */
    public get height(): number {
        return this.canvas.height;
    }

    /**
     * Getter for the Game's ControlScheme
     */
    public get controlScheme(): ControlScheme {
        return this.config?.controlScheme ?? this.defaultControlScheme;
    }

    /**
     * Add a new State to the Game
     *
     * @param state the State to add
     */
    public addState(state: State): void {
        this.states.set(state.name, state);
    }

    /**
     * Add a set of States to the Game
     *
     * @param state the States to add
     */
    public addStates(...states: Array<State>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Switch to the State given by name.
     *
     * Calls .end() on the outgoing State, and .init() on the incoming
     *
     * Signals the renderer that the rendering mode may have changed
     *
     * @param name the name of the State to switch to
     */
    public switchToState(name: string): void {
        this.currentState?.end(this);

        this.currentState = this.states.get(name);

        if (this.currentState) {
            this.currentState.init(this);
            this.renderer.setRenderingMode(this.currentState.renderingMode);
        }
        else {
            throw new ProtoGLError({
                class: 'Game',
                method: 'switchToState',
                message: `Failed to switch to State '${name}' : State does not exist`
            });
        }
    }

    /**
     * Add a new System to the Game
     *
     * @param system the System to add
     */
    public addSystem(system: System): void {
        this.systems.set(system.name, system);
    }

    /**
     * Add a set of Systems to the Game
     *
     * @param systems the Systems to add
     */
    public addSystems(...systems: Array<System>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Remove a System from the Game
     *
     * @param name the name of the System to remove
     */
    public removeSystem(name: string): void {
        this.systems.delete(name);
    }

    /**
     * Remove a set of Systems from the Game
     *
     * @param name the names of the Systems to remove
     */
    public removeSystems(...names: Array<string>): void {
        for (const name of names) {
            this.removeSystem(name);
        }
    }

    /**
     * Setter for generic Game data, useful for storing values which should be accessible to Entities, Systems or States
     *
     * Requires a typeparam for no other reason than visual similarity to getData() and for the encouragement of typesafe thinking
     *
     * @typeparam T the type of the incoming data
     *
     * @param key the name of the data to store
     * @param value the value of the data to store
     */
    public setData<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    /**
     * Getter for generic Game data
     *
     * @typeparam T the type of the retrieved data
     *
     * @param key the name of the data to retrieve
     *
     * @returns the retrieved data
     */
    public getData<T>(key: string): T {
        const data = this.data.get(key);

        if (!data) {
            // throw an error if the data is not found on the Game to allow type safety + simplistic no-questions consumer calls
            throw new ProtoGLError({
                class: 'Game',
                method: 'getData',
                message: `Failed to retrieve data with key '${key}'`
            });
        }

        return data as T;
    }

    /**
     * Register and create a given ShaderProgram so as to make it available for use in Entity Shader Components
     *
     * // TODO automagic shader creation on first-use might be nice
     * //   con: potentially leads to GL API calls for creating shader programs at runtime rather than inittime...
     *
     * @param shader the ShaderProgram to register
     */
    public registerShader(shader: ShaderProgram): void {
        this.renderer.createShaderProgram(shader);
    }

    /**
     * Begin game execution by first calling init() (if provided in the GameConfig) and then switching to the given state
     *
     * @param state the name of the first State to run
     */
    public start(state: string): void {
        this.config?.init?.();

        this.switchToState(state);

        this.run();
    }

    /**
     * Main Game execution method, representing a single frame.
     *
     * Calculates the frame delta, then executes all Systems, updates the current State, then ticks and renders the World, UI and Font
     */
    private run(): void {
        this.frameDelta = Date.now() - this.lastFrameTime;
        this.lastFrameTime = Date.now();

        this.renderer.clearScreen();

        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        if (this.currentState) {
            this.currentState.tick(this, this.frameDelta);
        }

        this.world.tick(this.frameDelta);
        this.ui.tick(this.frameDelta);
        this.font.tick(this.frameDelta);

        this.world.render();
        this.ui.render();
        this.font.render();

        // handle updating and displaying debug data when in debug mode
        if (this.config?.debugMode) {
            // a little hacky, we only wanna update the fps on every 10th frame to avoid annoying flickering
            this.debugData.frameCount++;
            if (this.debugData.frameCount % 10 === 0) {
                this.debugData.frameCount = 0;
                this.debugData.fps = (1000 / this.frameDelta).toFixed(1);
            }

            // render the frames
            // console.log('FRAMES: ', this.debugData.fps);
        }

        requestAnimationFrame(this.run.bind(this));
    }
}
