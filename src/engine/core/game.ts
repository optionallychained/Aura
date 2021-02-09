import { EntityManager } from '../entity/entity.manager';
import { InputManager } from '../input/input.manager';
import { Color } from '../math/color';
import { WebGLRenderer } from '../screen/webgl.renderer';
import { State } from '../state/state';
import { System } from '../system/system';
import { GameConfig } from './game.config';

/**
 * Core Game object; instantiated with or without a configuration object as a first step in creating a game
 *
 * Serves as the operational hub for the execution of the game; handles the Canvas, Input, Entities, Text, Systems and States
 *
 * Note: Games are controlled by the Keyboard only by default. See GameConfig#controlScheme for details
 *
 * Game execution begins when *start* is called on a configured Game instance
 */
export class Game {
    /** the EntityManager to be used in handling and processing the game's Entities */
    public entityManager: EntityManager;

    /** InputManager for handling all user input */
    public inputManager: InputManager;

    /** the Canvas to render the game on */
    private canvas: HTMLCanvasElement;

    /** Renderer */
    private renderer: WebGLRenderer;

    /** Frame time calculation utilities */
    private frameDelta = 0;
    private lastFrameTime = 0;

    /** Background colour for the Canvas */
    private background: Color;

    /** Game States, mapped by their name for simple management */
    private states = new Map<string, State>();

    /** Reference to the current game State for frametime execution */
    private currentState: State | undefined;

    /** Game Systems, mapped by their name for simple management */
    private systems = new Map<string, System>();

    /** Generic game data, stored as a Map for relative type-safety */
    private data = new Map<string, unknown>();

    /** Debug data, used if the game is configured with debugMode on */
    private debugData = {
        frameCount: 0,
        fps: ''
    };

    /**
     * Constructor. Initialise the Canvas, as well as the Renderer, EntityManager and InputManager
     *
     * @param config optional configuration
     */
    constructor(private readonly config?: GameConfig) {
        let canvas = document.getElementById(config?.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = config?.width ?? window.innerWidth;
        canvas.height = config?.height ?? window.innerHeight;

        this.canvas = canvas;

        this.background = config?.backgroundColor ?? new Color();

        this.renderer = new WebGLRenderer(canvas);
        this.entityManager = new EntityManager(this.renderer);
        this.inputManager = new InputManager(canvas, config?.controlScheme ?? 'keyboard');
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
     * Begin game execution by first calling init() (if provided in the GameConfig) and then switching to the given state
     *
     * // TODO type-safety for state name somehow?
     *
     * @param state the name of the first State to run
     */
    public start(state: string): void {
        this.config?.init?.();

        this.switchToState(state);

        this.run();
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
    public addStates(...states: State[]): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Switch to the State given by name.
     *
     * Calls .end() on the outgoing State, and .init() on the incoming
     *
     * // TODO type-safety for state name somehow?
     * // TODO error handling or other useful behavior for invalid state?
     *
     * @param name the name of the State to switch to
     */
    public switchToState(name: string): void {
        this.currentState?.end(this);

        this.currentState = this.states.get(name);

        this.currentState?.init(this);
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
    public addSystems(...systems: System[]): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Remove a System from the Game
     *
     * // TODO type-safety for the system name somehow?
     *
     * @param name the name of the System to remove
     */
    public removeSystem(name: string): void {
        this.systems.delete(name);
    }

    /**
     * Remove a set of Systems from the Game
     *
     * // TODO type-safety for the system names somehow?
     *
     * @param name the names of the Systems to remove
     */
    public removeSystems(...names: string[]): void {
        for (const name of names) {
            this.removeSystem(name);
        }
    }

    /**
     * Setter for generic Game data, useful for storing values which should be accessible to Entities, Systems or States
     *
     * @param key the name of the data to store
     * @param value the value of the data to store
     *
     * @typeparam T the type of the incoming data
     */
    public setData<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    /**
     * Getter for generic Game data
     *
     * // TODO error handling or other useful behavior for .get() => undefined?
     *
     * @param key the name of the data to retrieve
     *
     * @typeparam T the type of the retrieved data
     */
    public getData<T>(key: string): T {
        return this.data.get(key) as T;
    }

    // /** TODO temporary - to be supplanted by TextManager */
    // public renderText(text: string, position?: Vec2, color?: Color): void {
    //     this.renderer.renderText(text, position, color);
    // }

    /**
     * Main Game execution method, representing a single frame.
     *
     * Calculates the frame delta, then executes all Systems, updates the current State, updates all Entities, and renders
     */
    private run(): void {
        this.frameDelta = Date.now() - this.lastFrameTime;
        this.lastFrameTime = Date.now();

        this.renderer.clearScreen(this.background);

        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        if (this.currentState) {
            this.currentState.tick(this, this.frameDelta);
        }

        this.entityManager.tick(this.frameDelta);
        this.entityManager.render();

        // handle updating and displaying debug data when in debug mode
        if (this.config?.debugMode) {
            // a little hacky, we only wanna update the fps on every 10th frame to avoid annoying flickering
            this.debugData.frameCount++;
            if (this.debugData.frameCount % 10 === 0) {
                this.debugData.frameCount = 0;
                this.debugData.fps = (1000 / this.frameDelta).toFixed(1);
            }

            // render the frames
            // TODO
            // this.renderer.renderText(`fps: ${this.debugData.fps}`, new Vec2(this.width - 125, 25));
        }

        requestAnimationFrame(this.run.bind(this));
    }
}
