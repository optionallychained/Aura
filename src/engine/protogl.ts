import { InputManager } from '@input/inputManager';
import { Keys } from '@input/keys';
import { Vec3 } from '@math/vec3';
import { EntityManager } from '@protogl/entity/entityManager';
import { CanvasRenderer } from '@protogl/screen/canvasRenderer';
import { GameState } from '@protogl/state/gameState';

interface ProtoGLOpts {
    width?: number;
    height?: number;
    canvasId?: string;
    background?: Vec3;
    initFunc?: () => void
}

export class ProtoGL {
    public entityManager: EntityManager;

    private renderer: CanvasRenderer;
    private inputManager: InputManager;

    private frameDelta = 0;
    private lastFrameTime = 0;

    private background: Vec3;

    private states: { [name: string]: GameState } = {};
    private currentState: GameState | undefined;

    constructor(private config: ProtoGLOpts) {
        let canvas = document.getElementById(config.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = config.width ?? window.innerWidth;
        canvas.height = config.height ?? window.innerHeight;

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
        this.states[state.getName()] = state;
    }

    public switchToState(name: string): void {
        this.currentState = this.states[name];
        this.currentState.init();
    }

    public keyPressed(which: Keys): boolean {
        return this.inputManager.isKeyDown(which);
    }

    private run(): void {
        this.frameDelta = Date.now() - this.lastFrameTime;
        this.lastFrameTime = Date.now();

        this.renderer.clearScreen(this.background);

        if (this.currentState) {
            this.currentState.tick(this.frameDelta);
        }

        this.entityManager.update(this.frameDelta);
        this.entityManager.render();

        requestAnimationFrame(this.run.bind(this));
    }
}
