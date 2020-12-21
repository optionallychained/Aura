import { Renderer } from './renderer/renderer';

interface ProtoGLOpts {
    width?: number;
    height?: number;
    canvasId?: string;
}

export class ProtoGL {
    private renderer: Renderer;

    public constructor(opts: ProtoGLOpts) {
        let canvas = document.getElementById(opts.canvasId ?? '') as HTMLCanvasElement | null;

        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.append(canvas);
        }

        canvas.width = opts.width ?? window.innerWidth;
        canvas.height = opts.height ?? window.innerHeight;

        this.renderer = new Renderer(canvas);
    }

    public start(): void {
        this.renderer.render();
        requestAnimationFrame(this.start.bind(this));
    }
}