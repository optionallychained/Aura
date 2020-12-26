export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D;

    private TEST_NUM = 0;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!; //dumb assertion for now
    }

    public render(): void {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px monospace';
        this.TEST_NUM++;
        this.ctx.fillText(`Hello ProtoGL: ${this.TEST_NUM}`, 10, 300);
    }
}
