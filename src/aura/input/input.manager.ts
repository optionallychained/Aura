import { Vec2 } from '../math/vec2';
import { ControlScheme } from './controlScheme.type';
import { Keys } from './keys.enum';

/**
 * Core InputManager; utilised by the Game to defer the detection and management of user input
 */
export class InputManager {

    /** Current position of the mouse within the window */
    public mousePos = new Vec2();

    /** Position of last user click */
    public clickPos = new Vec2();

    /** Position of last user double click */
    public dblClickPos = new Vec2();

    /** Position of last user context click */
    public contextClickPos = new Vec2();

    /** Buffer for user keypresses */
    private readonly keyBuffer = new Set<string>();

    /** Boolean indicating whether or not the left mouse button is currently down */
    private mousePressed = false;

    /** Keys to ignore in the handling of keyboard input */
    private readonly ignoreKeys: ReadonlyArray<string> = [
        Keys.F_5,
        Keys.F_12
    ];

    /**
     * HTML Canvas
     */
    private canvas: HTMLCanvasElement | undefined;

    /**
     * The set of input handling methods, properly bound, useful in setting up and in tearing down
     */
    private readonly boundHandlers = {
        onKeyDown: this.onKeyDown.bind(this),
        onKeyUp: this.onKeyUp.bind(this),
        onMouseDown: this.onMouseDown.bind(this),
        onMouseUp: this.onMouseUp.bind(this),
        onClick: this.onClick.bind(this),
        onContextMenu: this.onContextMenu.bind(this),
        onDoubleClick: this.onDoubleClick.bind(this),
        onMouseMove: this.onMouseMove.bind(this)
    };

    /**
     * Constructor. Initialise event handlers as appropriate based on the controlScheme
     *
     * @param canvas the HTML Canvas to register events upon
     * @param controlScheme the ControlScheme given to the Game's Config, used for optimising event registration and handling
     */
    constructor(canvas: HTMLCanvasElement, public readonly controlScheme: ControlScheme) {
        this.canvas = canvas;

        switch (controlScheme) {
            case 'keyboard':
                this.setupKeyboard();
                break;

            case 'mouse':
                this.setupMouse(canvas);
                break;

            default:
                this.setupMouse(canvas);
                this.setupKeyboard();
        }
    }

    /**
     * Check if a given Key code is currently pressed by checking its presence within the keyBuffer
     *
     * @param code the Key code to check
     *
     * @returns a boolean indicating whether or not the key is pressed
     */
    public isKeyDown(code: Keys): boolean {
        return this.keyBuffer.has(code);
    }

    /**
     * Check if the mouse is down
     *
     * @returns a boolean indicating whether or not the mouse is pressed
     */
    public isMouseDown(): boolean {
        return this.mousePressed;
    }

    /**
     * Tear down event handlers; called as part of Game destroy()
     */
    public destroy(): void {
        switch (this.controlScheme) {
            case 'keyboard':
                this.tearDownKeyboard();
                break;

            case 'mouse':
                // eslint-disable-next-line
                this.tearDownMouse(this.canvas!);
                break;

            default:
                // eslint-disable-next-line
                this.tearDownMouse(this.canvas!);
                this.tearDownKeyboard();
        }

        this.canvas = undefined;
    }

    /**
     * keydown event handler. Add the Key pressed to the keyBuffer, if it's not ignored
     *
     * @param event the KeyboardEvent
     */
    private onKeyDown(event: KeyboardEvent): void {
        const { code } = event;

        event.preventDefault();

        if (!this.ignoreKeys.includes(code)) {
            this.keyBuffer.add(code);
        }
    }

    /**
     * keydown event handler. Remove the key pressed from the keyBuffer, if it's not ignored
     *
     * @param event the KeyboardEvent
     */
    private onKeyUp(event: KeyboardEvent): void {
        const { code } = event;

        event.preventDefault();

        if (!this.ignoreKeys.includes(code)) {
            this.keyBuffer.delete(code);
        }
    }

    /**
     * mousedown event handler. Set the isMouseDown boolean
     */
    private onMouseDown(): void {
        this.mousePressed = true;
    }

    /**
     * mouseup event handler. Set the isMouseDown boolean
     */
    private onMouseUp(): void {
        this.mousePressed = false;
    }

    /**
     * click event handler. Set the last click position
     *
     * @param event the MouseEvent
     */
    private onClick(event: MouseEvent): void {
        this.clickPos.set(event.x, event.y);
    }

    /**
     * contextmenu event handler. Set the last context click posiiton
     *
     * @param event the MouseEvent
     */
    private onContextMenu(event: MouseEvent): void {
        this.contextClickPos.set(event.x, event.y);
    }

    /**
     * dblclick event handler. Set the last double click posiiton
     *
     * @param event the MouseEvent
     */
    private onDoubleClick(event: MouseEvent): void {
        this.dblClickPos.set(event.x, event.y);
    }

    /**
     * mousemove event handler. Set the current mouse position
     *
     * @param event the MouseEvent
     */
    private onMouseMove(event: MouseEvent): void {
        this.mousePos.set(event.x, event.y);
    }

    /**
     * Initialize keyboard event handling
     */
    private setupKeyboard(): void {
        window.addEventListener('keydown', this.boundHandlers.onKeyDown);
        window.addEventListener('keyup', this.boundHandlers.onKeyUp);
    }

    /**
     * Tear down keyboard event handling
     */
    private tearDownKeyboard(): void {
        window.removeEventListener('keydown', this.boundHandlers.onKeyDown);
        window.removeEventListener('keyup', this.boundHandlers.onKeyUp);
    }

    /**
     * Initialize mouse event handling on the Canvas
     *
     * @param canvas the Canvas to register events upon
     */
    private setupMouse(canvas: HTMLCanvasElement): void {
        canvas.addEventListener('mousedown', this.boundHandlers.onMouseDown);
        canvas.addEventListener('mouseup', this.boundHandlers.onMouseUp);
        canvas.addEventListener('click', this.boundHandlers.onClick);
        canvas.addEventListener('contextmenu', this.boundHandlers.onContextMenu);
        canvas.addEventListener('dblclick', this.boundHandlers.onDoubleClick);
        canvas.addEventListener('mousemove', this.boundHandlers.onMouseMove);
    }

    /**
     * Tear down mouse event handling
     *
     * @param canvas the Canvas to deregister events from
     */
    private tearDownMouse(canvas: HTMLCanvasElement): void {
        canvas.removeEventListener('mousedown', this.boundHandlers.onMouseDown);
        canvas.removeEventListener('mouseup', this.boundHandlers.onMouseUp);
        canvas.removeEventListener('click', this.boundHandlers.onClick);
        canvas.removeEventListener('contextmenu', this.boundHandlers.onContextMenu);
        canvas.removeEventListener('dblclick', this.boundHandlers.onDoubleClick);
        canvas.removeEventListener('mousemove', this.boundHandlers.onMouseMove);
    }
}
