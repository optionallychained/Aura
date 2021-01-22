import { EntityManager } from '../entity/entityManager';
import { InputManager } from '../input/inputManager';
import { Keys } from '../input/keys';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';
import { CanvasRenderer } from '../screen/canvas.renderer';
import { State } from '../state/state';
import { System } from '../system/system';
import { GameConfig } from './game.config';

export class Game {
    public entityManager: EntityManager;

    private canvas: HTMLCanvasElement;

    private renderer: CanvasRenderer;
    private inputManager: InputManager;

    private frameDelta = 0;
    private lastFrameTime = 0;

    private background: Vec3;

    private states = new Map<string, State>();
    private currentState: State | undefined;

    private systems = new Map<string, System>();

    private data = new Map<string, any>();

    constructor(public config: GameConfig) {
        let canvas = document.getElementById(config.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = config.width ?? window.innerWidth;
        canvas.height = config.height ?? window.innerHeight;

        this.canvas = canvas;

        this.background = config.background ?? new Vec3();

        this.renderer = new CanvasRenderer(canvas);
        this.entityManager = new EntityManager(this.renderer);
        this.inputManager = new InputManager(canvas);
    }

    public start(firstState: string): void {
        this.config.init?.();

        this.switchToState(firstState);

        this.run();
    }

    public addState(state: State): void {
        this.states.set(state.getName(), state);
    }

    public switchToState(name: string): void {
        this.currentState?.end(this);

        this.currentState = this.states.get(name);
        // TODO error handling for invalid states
        this.currentState?.init(this);
    }

    public addSystem(system: System): void {
        this.systems.set(system.getName(), system);
    }

    // TODO maybe use type mapping to ensure that name is a valid system name
    // how would this be extended by game implementations? - interface merging?
    public removeSystem(name: string): void {
        this.systems.delete(name);
    }

    public keyPressed(which: Keys): boolean {
        return this.inputManager.isKeyDown(which);
    }

    public keysPressed(which: Keys[]): boolean {
        for (const key of which) {
            if (!this.inputManager.isKeyDown(key)) {
                return false;
            }
        }

        return true;
    }

    public getWidth(): number {
        return this.config.width ?? this.canvas.width;
    }

    public getHeight(): number {
        return this.config.height ?? this.canvas.height;
    }

    // temporary
    public renderText(text: string, position?: Vec2, color?: Vec3): void {
        this.renderer.renderText(text, position, color);
    }

    public setData(key: string, value: any): void {
        this.data.set(key, value);
    }

    public getData(key: string): any {
        return this.data.get(key);
    }

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
