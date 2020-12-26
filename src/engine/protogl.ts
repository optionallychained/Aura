import { InputManager } from '@input/inputManager';
import { Keys } from '@input/keys';
import { CanvasRenderer } from '@protogl/renderer/canvasRenderer';

interface ProtoGLOpts {
    width?: number;
    height?: number;
    canvasId?: string;
}

export class ProtoGL {
    private renderer: CanvasRenderer;
    private inputManager: InputManager;

    constructor(opts: ProtoGLOpts) {
        let canvas = document.getElementById(opts.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = opts.width ?? window.innerWidth;
        canvas.height = opts.height ?? window.innerHeight;

        this.renderer = new CanvasRenderer(canvas);
        this.inputManager = new InputManager(canvas);
    }

    public start(tick: () => void): void {
        tick();
        this.renderer.render();
        requestAnimationFrame(this.start.bind(this, tick));
    }

    public keyPressed(which: Keys): boolean {
        return this.inputManager.isKeyDown(which);
    }
}
