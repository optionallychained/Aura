import { Color } from '../math/color';

/**
 * Core WebGLRenderer; utilised by the Game to defer the rendering of Entities to the Canvas
 *
 * // TODO abstraction layer or interface ensuring common renderer functionality
 *
 * @see Game
 */
export class WebGLRenderer {

    private gl: WebGLRenderingContext;

    constructor(private readonly canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl');

        if (!gl) {
            throw Error('No WebGL Context support');
        }

        this.gl = gl;
    }

    public clearScreen(color: Color): void {
        this.gl.enable(this.gl.DEPTH_TEST);

        this.gl.clearColor(color.rf, color.gf, color.bf, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }
}
