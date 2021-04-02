import { Font2D } from '../font/2d';
import { Font3D } from '../font/3d';
import { InputManager } from '../input';
import { Color, Vec2 } from '../math';
import { Renderer } from '../renderer';
import { ShaderProgram } from '../shader/program';
import { State2D } from '../state/2d';
import { State3D } from '../state/3d';
import { System2D } from '../system/2d';
import { System3D } from '../system/3d';
import { TextureAtlas } from '../texture';
import { UI2D } from '../ui/2d';
import { UI3D } from '../ui/3d';
import { World2D } from '../world/2d';
import { World3D } from '../world/3d';
import { AuraError } from './aura.error';
import { GameConfig, GameConfigDefaults } from './game.config';


/**
 * Generic abstract Game object, setting out the fundamental properties and runtime behaviour of all Aura Games, and broken down into
 *   concrete 2D and 3D variants in Game2D and Game3D
 *
 * Implements only the abstractable aspects of both flavours of Game, and enforces the implementation of 2D and 3D specific members and
 *   behaviour for subclasses, providing type-safety where appropriate or desired throughout the system for 2D and 3D Game creation
 *
 * Games may be instantiated with or without configuration objects to tweak their behaviour and initial state
 *
 * Game execution begins when *start()* is called upon a Game instance
 */
export abstract class Game {
    /** Abstract 2D or 3D World, to be implemented and the type to be narrowed by the subclass */
    public abstract readonly world: World2D | World3D;

    /** Abstract 2D or 3D Font, to be implemented and the type to be narrowed by the subclass */
    public abstract readonly font: Font2D | Font3D;

    /** Abstract 2D or 3D UI, to be implemented and the type to be narrowed by the subclass */
    public abstract readonly ui: UI2D | UI3D;

    /** InputManager */
    public readonly input: InputManager;

    /** Renderer */
    public readonly renderer: Renderer;

    /** HTML Canvas */
    public readonly canvas: HTMLCanvasElement;

    /** Abstract mapping of 2D or 3D States, to be implemented and managed and the type to be narrowed by the subclass */
    protected abstract readonly states: Map<string, State2D | State3D>;

    /** Abstract reference to the current State, to be implemented and managed and the type to be narrowed by the subclass */
    protected abstract currentState: State2D | State3D | undefined;

    /** Abstract mapping of 2D or 3D Systems, to be implemented and managed and the type to be narrowed by the subclass */
    protected abstract readonly systems: Map<string, System2D | System3D>;

    /** Frame time step, calculated during run() */
    protected frameDelta = 0;

    /** Time of the last frame, set during run() */
    protected lastFrameTime = 0;

    /** Generic mapping of Game Data, useful for storing and retrieving arbitrary global data at Game runtime */
    protected readonly data = new Map<string, unknown>();

    /** Debug Mode, as potentially set by the GameConfig */
    protected debugMode: GameConfig['debugMode'];

    /** Internal-use DebugData for tracking certain game statistics while in Debug Mode */
    protected readonly debugData = {
        frameCount: 0,
        fps: ''
    };

    /**
     * Default GameConfig fallback values for various configuration options
     */
    protected readonly defaults: GameConfigDefaults = {
        backgroundColor: new Color(),
        canvasDimensions: new Vec2(window.innerWidth, window.innerHeight),
        controlScheme: 'keyboard',
        fontCharset: [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
            'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '[', ']', '+', '-', '*', '/', '!', '?', '\'', '"', '#', '£',
            '$', '&', '%', '^', ',', '.', ':', ';', '<', '>', '_', ' ', '~', '~'
        ],
        fontAtlas: new TextureAtlas('text', 'res/font.png', 64, 1),
    }

    /**
     * Reference to the potential GameConfig init() method
     */
    protected init: GameConfig['init'];

    /**
     * Constructor. Take an optional GameConfig, and initialise all generic/abstractable aspects of the Game
     *
     * @param config the optional GameConfig
     */
    constructor(config?: GameConfig) {
        if (config?.canvasId) {
            this.canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;

            if (!this.canvas) {
                throw new AuraError({
                    class: 'Game',
                    method: 'construct',
                    message: `Failed to retrieve Canvas with id ${config.canvasId}`
                });
            }
        }
        else {
            this.canvas = document.createElement('canvas');
            document.body.append(this.canvas);
        }

        this.canvas.width = config?.canvasDimensions?.x ?? this.defaults.canvasDimensions.x;
        this.canvas.height = config?.canvasDimensions?.y ?? this.defaults.canvasDimensions.y;

        // set up the Renderer and InputManager
        this.renderer = new Renderer(this, config?.backgroundColor ?? this.defaults.backgroundColor);
        this.input = new InputManager(this, config?.controlScheme ?? this.defaults.controlScheme);

        // copy over some configuration
        this.debugMode = config?.debugMode;
        this.init = config?.init;
    }

    /**
     * Abstract single State addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D States
     *
     * @param state the State2D or State3D to add; the type will be narrowed by the subclass
     */
    public abstract addState(state: State2D | State3D): void;

    /**
     * Abstract multi State addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D States
     *
     * @param states the list of State2Ds or State3Ds to add; the type will be narrowed by the subclass
     */
    public abstract addStates(...states: Array<State2D | State3D>): void;

    /**
     * Abstract State init routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a State2D's lifecycle methods will receive a type-correct Game2D
     */
    public abstract initState(): void;

    /**
     * Abstract State end routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a State2D's lifecycle methods will receive a type-correct Game2D
     */
    public abstract endState(): void;

    /**
     * Switch to the State given by name
     *
     * Calls the State lifecycle method *end()* on the current State, then calls the lifecycle method *init()* on the new State
     *
     * Throws an error if the desired State is not found for runtime safety
     *
     * @param name the name of the State to switch to
     */
    public switchToState(name: string): void {
        this.endState();

        this.currentState = this.states.get(name);

        if (!this.currentState) {
            throw new AuraError({
                class: 'Game',
                method: 'switchToState',
                message: `Failed to switch to State '${name}' : State does not exist`
            });
        }

        this.initState();
    }

    /**
     * Abstract single System addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D Systems
     *
     * @param system the System2D or System3D to add; the type will be narrowed by the subclass
     */
    public abstract addSystem(system: System2D | System3D): void;

    /**
     * Abstract multi System addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D Systems
     *
     * @param systems the list of System2Ds or System3Ds to add; the type will be narrowed by the subclass
     */
    public abstract addSystems(...systems: Array<System2D | System3D>): void;

    /**
     * Remove a single System by name
     *
     * @param name the name of the System to remove
     */
    public removeSystem(name: string): void {
        this.systems.delete(name);
    }

    /**
     * Remvove a list of Systems by name
     *
     * @param names the names of the Systems to remove
     */
    public removeSystems(...names: Array<string>): void {
        for (const name of names) {
            this.removeSystem(name);
        }
    }

    /**
     * Set the value of some arbitrary generic Game Data
     *
     * @param key the key for the Data
     * @param value the value for the Data
     */
    public setData<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    /**
     * Retrieve the value of some arbitrary generic Game Data by name
     *
     * Type param is for consumer convenience and relative type safety
     *
     * Throws an error if the data is not retrievable by the key to avoid runtime issues
     *
     * @param key the key of the Data to retrieve
     *
     * @typeparam T the type of the Data being retrieved
     *
     * @returns the retrieved Data
     */
    public getData<T>(key: string): T {
        const data = this.data.get(key);

        if (!data) {
            throw new AuraError({
                class: 'Game',
                method: 'getData',
                message: `Failed to retrieve data with key '${key}'`
            });
        }

        return data as T;
    }

    /**
     * Delete some arbitrary generic Game Data by name
     *
     * @param key the name of the Data to delete
     */
    public deleteData(key: string): void {
        this.data.delete(key);
    }

    /**
     * Create a given ShaderProgram so as to make it available for use in Entity Shader Components
     *
     * All ShaderPrograms to be used by the application should be registered *before* execution is begun with *start()*
     *
     * @param shader the ShaderProgram to register
     */
    public registerShader(shader: ShaderProgram): void {
        this.renderer.createShaderProgram(shader);
    }

    /**
     * Begin game executon by first calling the optional init() provided in the GameConfig, and then switching to the named State
     *
     * @param state the name of the State to start with
     */
    public start(state: string): void {
        this.init?.();

        this.switchToState(state);

        this.run();
    }

    /**
     * Abstract frame update routine, to be implemented by the subclass and intended to be used for updating the concrete Game's Systems and
     *   current State
     *
     * By not implementing generically, ensures for example that a State2D or System2D's tick() lifecycle method will receive a
     *   type-correct Game2D
     */
    protected abstract update(): void;

    /**
     * Main game execution routine, representing the production of a single frame
     *
     * Performs the following actions in order:
     *     - calculates the frame delta
     *     - executes the abstract update(), triggering the update of all Systems and the current State
     *     - executes the World update()
     *     - executes the UI update()
     *     - executed the Font update()
     *     - clears the screen
     *     - renders the World
     *     - renders the UI
     *     - renders the Font
     *     - handles debugData if appropriate
     */
    private run(): void {
        const now = Date.now();

        this.frameDelta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        this.update();

        this.world.tick(this, this.frameDelta);
        this.ui.tick(this, this.frameDelta);
        this.font.tick(this, this.frameDelta);

        this.renderer.clearScreen();

        this.world.render();
        this.ui.render();
        this.font.render();

        if (this.debugMode) {
            this.debugData.frameCount++;

            if (this.debugData.frameCount % 10 === 0) {
                this.debugData.frameCount = 0;
                this.debugData.fps = (1000 / this.frameDelta).toFixed(1);
            }
        }

        requestAnimationFrame(this.run.bind(this));
    }
}
