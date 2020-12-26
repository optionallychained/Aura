import { Keys } from '@input/keys';
import { Vec2 } from '@math/vec2';

export class InputManager {

    private keyBuffer = new Set<Keys>();

    private mouseDown = false;

    private mousePos = new Vec2();

    private clickPos = new Vec2();
    private dblClickPos = new Vec2();
    private contextClickPos = new Vec2();

    private ignoreKeys = [
        Keys.F_5,
        Keys.F_12
    ];

    constructor(private canvas: HTMLCanvasElement) {
        this.init();
    }

    public init(): void {
        // TODO: deprecated implementation for now, look at .key, .code, etc
        window.addEventListener('keydown', (event: KeyboardEvent): void => {
            const { which } = event;

            if (!this.ignoreKeys.includes(which)) {
                event.preventDefault();
                this.keyBuffer.add(which);
            }
        });

        window.addEventListener('keyup', (event: KeyboardEvent): void => {
            const { which } = event;

            if (!this.ignoreKeys.includes(which)) {
                this.keyBuffer.delete(which);
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

    public isKeyDown(which: Keys): boolean {
        return this.keyBuffer.has(which);
    }
}
