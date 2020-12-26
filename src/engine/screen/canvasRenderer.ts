import { MathUtils } from '@protogl/math/mathUtils';
import { Vec2 } from '@protogl/math/vec2';
import { Vec3 } from '@protogl/math/vec3';

export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D;

    private TEST_NUM = 0;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!; //dumb assertion for now
    }

    public clearScreen(colour: Vec3): void {
        this.ctx.fillStyle = MathUtils.rgbToHex(colour);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public renderRect(position: Vec2, dimensions: Vec2, colour: Vec3): void {
        this.ctx.fillStyle = MathUtils.rgbToHex(colour);
        this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
    }
}
