import { InputManager } from '@input/inputManager';
import { Keys } from '@input/keys';
import { Vec3 } from '@math/vec3';
import { CanvasRenderer } from '@protogl/screen/canvasRenderer';

interface ProtoGLOpts {
    width?: number;
    height?: number;
    canvasId?: string;
    background?: Vec3;
}

export class ProtoGL {
    private renderer: CanvasRenderer;
    private inputManager: InputManager;

    private delta = 0;
    private lastFrameTime = 0;

    private background: Vec3;

    constructor(opts: ProtoGLOpts) {
        let canvas = document.getElementById(opts.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = opts.width ?? window.innerWidth;
        canvas.height = opts.height ?? window.innerHeight;

        this.background = opts.background ?? new Vec3();

        this.renderer = new CanvasRenderer(canvas);
        this.inputManager = new InputManager(canvas);
    }

    public run(tick: () => void): void {
        this.delta = Date.now() - this.lastFrameTime;
        this.lastFrameTime = Date.now();

        this.renderer.clearScreen(this.background);

        tick();
        this.renderer.render();
        requestAnimationFrame(this.run.bind(this, tick));
    }

    public keyPressed(which: Keys): boolean {
        return this.inputManager.isKeyDown(which);
    }
}
