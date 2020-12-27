import { InputManager } from '@protogl/input/inputManager';
import { Keys } from '@protogl/input/keys';
import { Vec3 } from '@protogl/math/vec3';
import { EntityManager } from '@protogl/entity/entityManager';
import { CanvasRenderer } from '@protogl/screen/canvasRenderer';
import { GameState } from '@protogl/state/gameState';
import { System } from '@protogl/system/system';
import { Vec2 } from '@protogl/math/vec2';

interface ProtoGLOpts {
    width?: number;
    height?: number;
    canvasId?: string;
    background?: Vec3;
    initFunc?: () => void
}

export class ProtoGL {
    public entityManager: EntityManager;

    private canvas: HTMLCanvasElement;

    private renderer: CanvasRenderer;
    private inputManager: InputManager;

    private frameDelta = 0;
    private lastFrameTime = 0;

    private background: Vec3;

    private states = new Map<string, GameState>();
    private currentState: GameState | undefined;

    private systems = new Map<string, System>();

    private data = new Map<string, any>();

    constructor(public config: ProtoGLOpts) {
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
        if (this.config.initFunc) {
            this.config.initFunc();
        }

        this.switchToState(firstState);

        this.run();
    }

    public addState(state: GameState): void {
        this.states.set(state.getName(), state);
    }

    public switchToState(name: string): void {
        this.currentState?.end(this);

        this.currentState = this.states.get(name);
        // TODO error handling for invalid states
        this.currentState?.init(this);
    }

    public addSystem(system: System): void {
        this.systems.set(system.name, system);
    }

    // TODO better way
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
            s.tick(this.frameDelta);
        });

        if (this.currentState) {
            this.currentState.tick(this, this.frameDelta);
        }

        this.entityManager.update(this.frameDelta);
        this.entityManager.render();

        requestAnimationFrame(this.run.bind(this));
    }
}
