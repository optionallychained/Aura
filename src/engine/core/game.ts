import { EntityManager } from '../entity/entity.manager';
import { InputManager } from '../input/input.manager';
import { Keys } from '../input/keys';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';
import { CanvasRenderer } from '../screen/canvas.renderer';
import { State } from '../state/state';
import { System } from '../system/system';
import { GameConfig } from './game.config';

/**
 * Core Game object; instantiated with or without a configuration object as a first step in creating a game
 *
 * Serves as the operational hub for the execution of the game; handles the Canvas, Entities, Text, Systems and States
 *
 * Game execution begins when *start* is called on a configured Game instance
 */
export class Game {
    /** the EntityManager to be used in handling and processing the game's Entities */
    public entityManager: EntityManager;

    /** the Canvas to render the game on */
    private canvas: HTMLCanvasElement;

    /** Renderer */
    private renderer: CanvasRenderer;

    /** InputManager for handling all user input */
    private inputManager: InputManager;

    /** Frame time calculation utilities */
    private frameDelta = 0;
    private lastFrameTime = 0;

    /** Background colour for the Canvas */
    private background: Vec3;

    /** Game States, mapped by their name for simple management */
    private states = new Map<string, State>();

    /** Reference to the current game State for frametime execution */
    private currentState: State | undefined;

    /** Game Systems, mapped by their name for simple management */
    private systems = new Map<string, System>();

    /** Generic game data, stored as a Map for relative type-safety */
    private data = new Map<string, unknown>();

    /**
     * Constructor. Initialise the Canvas, as well as the Renderer, EntityManager and InputManager
     *
     * @param config optional configuration
     */
    constructor(private config?: GameConfig) {
        let canvas = document.getElementById(config?.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = config?.width ?? window.innerWidth;
        canvas.height = config?.height ?? window.innerHeight;

        this.canvas = canvas;

        this.background = config?.backgroundColor ?? new Vec3();

        this.renderer = new CanvasRenderer(canvas);
        this.entityManager = new EntityManager(this.renderer);
        this.inputManager = new InputManager(canvas);
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
        this.states.set(state.getName(), state);
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
        this.systems.set(system.getName(), system);
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
     * Utility for checking if a given key is currently pressed
     *
     * @param code the Key to check
     *
     * @returns a boolean indicating whether or not the key is pressed
     */
    public keyPressed(code: Keys): boolean {
        return this.inputManager.isKeyDown(code);
    }

    /**
     * Utility for checking if a given *set* of keys are all currently pressed
     *
     * @param code the Keys to check
     *
     * @returns a boolean indicating whether or not all given keys are pressed
     */
    public keysPressed(code: Keys[]): boolean {
        for (const key of code) {
            if (!this.inputManager.isKeyDown(key)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Getter for the Canvas' width
     *
     * @returns the width of the Canvas
     */
    public getWidth(): number {
        return this.canvas.width;
    }

    /**
     * Getter for the Canvas' height
     *
     * @returns the height of the Canvas
     */
    public getHeight(): number {
        return this.canvas.height;
    }

    // temporary
    public renderText(text: string, position?: Vec2, color?: Vec3): void {
        this.renderer.renderText(text, position, color);
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

    /**
     * Main Game execution method, representing a single frame.
     *
     * Calculates the frame delta, then executes all Systems, ticks the current State, updates all Entities, and renders
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

        requestAnimationFrame(this.run.bind(this));
    }
}
