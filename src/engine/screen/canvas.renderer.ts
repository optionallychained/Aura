import { Color } from '../math/color';
import { Vec2 } from '../math/vec2';

/**
 * Core CanvasRenderer; utilised by the Game to defer the rendering of Entities and Text to the Canvas
 *
 * A temporary implementation for simplicity in getting off the ground, to be supplanted by a rendering abstraction layer, WebGLRenderer, and conforming CanvasRenderer
 *
 * @see Game
 */
export class CanvasRenderer {

    /** 2D rendering context */
    private ctx: CanvasRenderingContext2D;

    /**
     * Constructor. Take and store the game's Canvas and retrieve its 2D rendering context
     *
     * @param canvas the Canvas
     */
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!; //dumb assertion for now

        this.ctx.font = '24px monospace';
    }

    /**
     * Clear the screen to the given color
     *
     * @param color the color to clear to, expressed as a Vec3
     */
    public clearScreen(color: Color): void {
        this.ctx.fillStyle = color.hex;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Render a rectangle with the given position, dimensions and color
     *
     * @param position the position of the rect
     * @param dimensions the dimensions of the rect
     * @param color the color of the rect
     */
    public renderRect(position: Vec2, dimensions: Vec2, color: Color): void {
        this.ctx.fillStyle = color.hex;
        this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
    }

    /**
     * Render the given text at the given position in the given color
     *
     * @param text the text to render
     * @param position the position of the text (temporary default value)
     * @param color the color of the text; default value is white
     */
    public renderText(text: string, position = new Vec2(10, 24), color = new Color(255, 255, 255)): void {
        this.ctx.fillStyle = color.hex;
        this.ctx.fillText(text, position.x, position.y);
    }
}
