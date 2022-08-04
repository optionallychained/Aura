import { Text as Text2D } from '../text/2d/text';
import { Text as Text3D } from '../text/3d/text';
import { InputManager } from '../input/input.manager';
import { Color } from '../math/color';
import { Renderer } from '../renderer/renderer';
import { ShaderProgram } from '../shader/program/shaderProgram';
import { State as State2D } from '../state/2d/state';
import { State as State3D } from '../state/3d/state';
import { System as System2D } from '../system/2d/system';
import { System as System3D } from '../system/3d/system';
import { TextureAtlas } from '../texture/textureAtlas';
import { UI as UI2D } from '../ui/2d/ui';
import { UI as UI3D } from '../ui/3d/ui';
import { World as World2D } from '../world/2d/world';
import { World as World3D } from '../world/3d/world';
import { AuraError } from './aura.error';
import { GameConfigBase, GameConfigDefaults } from './game.config.base';
import { AudioManager } from '../audio/audio.manager';
import { ClassType } from '../aura.types';

/**
 * Abstract core Game; implementing the abstractable behavior for the operation of both 2D and 3D Games
 *
 * Broken down into concrete 2D and 3D variants, providing domain-specific behavior and type safety for Aura2D and Aura3D respectively
 *
 * Games operate on the Entity-Component-System architecture, and make use of States (analogous to Scenes) for runtime functionality
 *
 * This abstract Game centralises EntityManagement by weay of the World, Text and UI management utilities, as well as update and rendering
 *
 * Game execution begins when `start()` is called upon a Game instance, providing the name of a registered State to switch to
 */
export abstract class GameBase {

    /** Abstract 2D or 3D World; to be type narrowed by the subclass */
    public abstract readonly world: World2D | World3D;

    /** Abstract 2D or 3D Text; to be type narrowed by the subclass */
    public abstract readonly text: Text2D | Text3D;

    /** Abstract 2D or 3D UI; to be type narrowed by the subclass */
    public abstract readonly ui: UI2D | UI3D;

    /** Audio manager for adding and playing sounds */
    public readonly audio = new AudioManager();

    /** InputManager */
    public readonly input: InputManager;

    /** Renderer */
    public readonly renderer: Renderer;

    /** HTML Canvas */
    public canvas: HTMLCanvasElement | undefined;

    /** Abstract mapping of 2D or 3D States, to be type narrowed by the subclass */
    protected abstract readonly states: Map<string, State2D | State3D>;

    /** Abstract reference to the current 2D or 3D State, to be type narrowed by the subclass */
    protected abstract currentState: State2D | State3D | undefined;

    /** Abstract mapping of 2D or 3D Systems, to be type narrowed by the subclass */
    protected abstract readonly systems: Map<string, System2D | System3D>;

    /** Frame time step, calculated during run() */
    protected frameDelta = 0;

    /** Time of the last frame, set during run() */
    protected lastFrameTime = Date.now();

    /** Generic mapping of Game Data, useful for storing and retrieving arbitrary global data at Game runtime */
    protected readonly data = new Map<string, unknown>();

    /** Debug Mode, as potentially set by the GameConfig */
    protected debugMode: GameConfigBase['debugMode'];

    /** Internal-use DebugData for tracking certain game statistics while in Debug Mode */
    protected readonly debugData = {
        frameCount: 0,
        fps: ''
    };

    /**
     * Default GameConfig fallback values for various configuration options
     */
    protected readonly defaults: GameConfigDefaults = {
        backgroundColor: Color.black(),
        controlScheme: 'keyboard',
        textCharset: [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
            'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '[', ']', '+', '-', '*', '/', '!', '?', '\'', '"', '#', '£',
            '$', '&', '%', '^', ',', '.', ':', ';', '<', '>', '_', ' ', '~', '~'
        ],
        textAtlas: new TextureAtlas('text', 'res/font.png', 2048, 32, 64, 1)
    }

    /**
     * Reference to the potential GameConfig init() method
     */
    protected init: GameConfigBase['init'];

    /**
     * Flag for whether or not the Game is stopped and therefore should not request any animation frames
     */
    private stopped = false;

    /**
     * Constructor. Take an optional GameConfig, and initialise all generic/abstractable aspects of the Game
     *
     * @param config the optional GameConfig
     */
    constructor(config: GameConfigBase, defaultShaders: Array<ShaderProgram>) {
        this.canvas = this.configureCanvas(config.canvas);
        this.renderer = new Renderer(this, config.backgroundColor ?? this.defaults.backgroundColor);
        this.input = new InputManager(this.canvas, config.controlScheme ?? this.defaults.controlScheme);

        config.sounds?.forEach((sound) => {
            this.audio.add(sound.name, sound.filePath);
        });

        // register shaders; do not register the same shader twice if a default was provided in the GameConfig by mistake
        for (const shader of [...defaultShaders, ...config.shaders?.filter((s) => !defaultShaders.includes(s)) ?? []]) {
            this.renderer.createShaderProgram(shader);
        }

        this.debugMode = config.debugMode;
        this.init = config.init;
    }

    /**
     * Abstract single 2D or 3D State addition; to be implemented and type narrowed by the subclass
     *
     * @param state the 2D or 3D State to add
     */
    public abstract addState(state: State2D | State3D): void;

    /**
     * Abstract multi 2D or 3D State addition; to be implemented and type narrowed by the subclass
     *
     * @param states the 2D or 3D States to add
     */
    public abstract addStates(...states: Array<State2D | State3D>): void;

    /**
     * Switch to the named State
     *
     * Ends the current State, then initializes the new State before switching for frame updates
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
     * Abstract single 2D or 3D System addition; to be implemented and type narrowed by the subclass
     *
     * @param system the 2D or 3D System to add
     */
    public abstract addSystem(system: ClassType<System2D | System3D>): void;

    /**
     * Abstract multi 2D or 3D System addition; to be implemented and type narrowed by the subclass
     *
     * @param system the 2D or 3D Systems to add
     */
    public abstract addSystems(...systems: Array<ClassType<System2D | System3D>>): void;

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
     * Check if the Game has a named System
     *
     * @param name the name of the System to check
     *
     * @returns whether or not the Game has the named System
     */
    public hasSystem(name: string): boolean {
        return this.systems.has(name);
    }

    /**
     * Check if the Game has a list of named Systems
     *
     * @param names the names of the Systems to check
     *
     * @returns whether or not the Game has all of the named Systems
     */
    public hasSystems(...names: Array<string>): boolean {
        for (const name of names) {
            if (!this.hasSystem(name)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Abstract system retrieval method; to be implemented and type narrowed by the subclass
     *
     * @param name the name of the system to retrieve
     *
     * @returns the retrieved system
     */
    public abstract getSystem(name: string): System2D | System3D; // TODO remove need for has*() by | undefined?

    /**
     * Set the value of some arbitrary generic Game Data
     *
     * @typeparam the type of the data being set
     *
     * @param key the key for the Data
     * @param value the value for the Data
     */
    public setData<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    /**
     * Retrieve the value of some arbitrary generic Game Data by key
     *
     * Throws an error if there's no data by the given key
     *
     * @typeparam T the type of the Data being retrieved
     *
     * @param key the key of the Data to retrieve
     *
     * @returns the retrieved Data
     */
    public getData<T>(key: string): T {
        const data = this.data.get(key);

        if (data === undefined) {
            throw new AuraError({
                class: 'Game',
                method: 'getData',
                message: `Failed to retrieve data with key '${key}'`
            });
        }

        return data as T;
    }

    /**
     * Delete some arbitrary generic Game Data by key
     *
     * @param key the key of the Data to delete
     */
    public deleteData(key: string): void {
        this.data.delete(key);
    }

    /**
     * Create a given ShaderProgram, making it available for use in Entity Shader Components
     *
     * All ShaderPrograms to be used by the application should be registered before execution is begun with `start()`
     *
     * @param shader the ShaderProgram to register
     */
    public registerShader(shader: ShaderProgram): void {
        this.renderer.createShaderProgram(shader);
    }

    /**
     * Begin game executon by calling the optional GameConfig init(), switching to the named State, and finally executing the main loop
     *
     * @param state the name of the State to start with
     */
    public start(state: string): void {
        this.init?.();

        this.switchToState(state);

        this.run();
    }

    /**
     * Destroy the game [WIP]
     */
    public destroy(): void {
        this.stopped = true;

        this.renderer.destroy();
        this.input.destroy();

        this.canvas?.remove();

        this.canvas = undefined;
    }

    /**
     * Abstract State initialization routine, to be implemented by the subclass for type safety in State initialization methods
     */
    protected abstract initState(): void;

    /**
     * Abstract State end routine, to be implemented by the subclass for type safety in State end methods
     */
    protected abstract endState(): void;

    /**
     * Abstract frame update routine; to be implemented by the subclass for type safety on core construct update routines
     */
    protected abstract update(): void;

    /**
     * Configure the Game's canvas
     *
     * @param config the GameConfig.canvas, if provided
     *
     * @returns the configured canvas
     */
    private configureCanvas(config: GameConfigBase['canvas']): HTMLCanvasElement {
        let width, height, canvas;

        if (config?.id) {
            canvas = document.getElementById(config.id) as HTMLCanvasElement | undefined;

            if (!canvas) {
                throw new AuraError({
                    class: 'Game',
                    method: 'configureCanvas',
                    message: `Failed to retrieve Canvas with id ${config.id}`
                });
            }

            // assume the canvas is sized appropriately within the document by CSS
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        }
        else {
            let parent;

            if (config?.parentId) {
                parent = document.getElementById(config.parentId);

                if (!parent) {
                    throw new AuraError({
                        class: 'Game',
                        method: 'configureCanvas',
                        message: `Failed to retrieve Canvas Parent with id ${config.parentId}`
                    });
                }
            }
            else {
                parent = document.body;

                // assume canvas is on a standalone page; style the body to accommodate a full-size canvas
                parent.style.width = '100vw';
                parent.style.height = '100vh';
                parent.style.margin = '0';
                parent.style.overflow = 'hidden';
            }

            // adopt the size of the parent
            width = parent.clientWidth;
            height = parent.clientHeight;

            // create the canvas
            canvas = document.createElement('canvas');
            parent.append(canvas);
        }

        // config dimensions override computed dimensions in all cases
        canvas.width = config?.dimensions?.x ?? width;
        canvas.height = config?.dimensions?.y ?? height;
        if (!config?.dimensions?.x) {
            canvas.style.width = '100%';
        }
        if (!config?.dimensions?.y) {
            canvas.style.height = '100%';
        }

        if (config?.hideCursor) {
            canvas.style.cursor = 'none';
        }

        return canvas;
    }

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
        if (this.stopped) {
            return;
        }

        const now = Date.now();

        this.frameDelta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        this.update();

        this.world.tick(this, this.frameDelta);
        this.ui.tick(this, this.frameDelta);
        this.text.tick(this, this.frameDelta);

        this.renderer.clearScreen();

        this.world.render();
        this.ui.render();
        this.text.render();

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
