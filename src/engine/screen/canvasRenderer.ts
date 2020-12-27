import { MathUtils } from '../math/mathUtils';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';

export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!; //dumb assertion for now

        this.ctx.font = '24px monospace';
    }

    public clearScreen(color: Vec3): void {
        this.ctx.fillStyle = MathUtils.rgbToHex(color);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public renderRect(position: Vec2, dimensions: Vec2, color: Vec3): void {
        this.ctx.fillStyle = MathUtils.rgbToHex(color);
        this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
    }

    public renderText(text: string, position = new Vec2(10, 24), color = new Vec3(255, 255, 255)): void {
        this.ctx.fillStyle = MathUtils.rgbToHex(color);
        this.ctx.fillText(text, position.x, position.y);
    }
}
