import { Vec2 } from '../math/vec2';
import { Keys } from './keys';

export class InputManager {

    private keyBuffer = new Set<string>();

    private mouseDown = false;

    private mousePos = new Vec2();

    private clickPos = new Vec2();
    private dblClickPos = new Vec2();
    private contextClickPos = new Vec2();

    private ignoreKeys: string[] = [
        Keys.F_5,
        Keys.F_12
    ];

    constructor(private canvas: HTMLCanvasElement) {
        this.init();
    }

    public init(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            const { code } = event;

            event.preventDefault();

            if (!this.ignoreKeys.includes(code)) {
                this.keyBuffer.add(code);
            }
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            const { code } = event;

            event.preventDefault();

            if (!this.ignoreKeys.includes(code)) {
                this.keyBuffer.delete(code);
            }
        });

        this.canvas.addEventListener('mousedown', () => {
            this.mouseDown = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mouseDown = false;
        });

        this.canvas.addEventListener('click', (event) => {
            this.clickPos.set(event.x, event.y);
        });

        this.canvas.addEventListener('contextmenu', (event) => {
            this.contextClickPos.set(event.x, event.y);
        });

        this.canvas.addEventListener('dblclick', (event) => {
            this.dblClickPos.set(event.x, event.y);
        });

        this.canvas.addEventListener('mousemove', (event) => {
            this.mousePos.set(event.x, event.y);
        });
    }

    public isKeyDown(code: Keys): boolean {
        return this.keyBuffer.has(code);
    }
}
