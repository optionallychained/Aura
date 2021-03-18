import { Game } from '../core';
import { Vec2 } from '../math';
import { ControlScheme } from './controlScheme.type';
import { Keys } from './keys.enum';

/**
 * Core InputManager; utilised by the Game to defer the detection and management of user input
 *
 * @see Game
 */
export class InputManager {

    /** Buffer for user keypresses */
    private readonly keyBuffer = new Set<string>();

    /** Boolean indicating whether or not the left mouse button is currently down */
    private mousePressed = false;

    /** Current position of the mouse within the window */
    private mousePos = new Vec2();

    /** Position of last user click */
    private clickPos = new Vec2();

    /** Position of last user double click */
    private dblClickPos = new Vec2();

    /** Position of last user context click */
    private contextClickPos = new Vec2();

    /** Keys to ignore in the handling of keyboard input */
    private readonly ignoreKeys: ReadonlyArray<string> = [
        Keys.F_5,
        Keys.F_12
    ];

    /**
     * Constructor. Take and store the game's Canvas for registering input events upon
     *
     * @param canvas the Canvas
     * @param controlScheme the ControlScheme given to the Game's Config, used for optimising event registration and handling
     */
    constructor(game: Game, controlScheme: ControlScheme) {
        switch (controlScheme) {
            case 'keyboard':
                this.initializeKeyboard();
                break;

            case 'mouse':
                this.initializeMouse(game.canvas);
                break;

            default:
                this.initializeKeyboard();
                this.initializeMouse(game.canvas);
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
     *
     * // TODO register on Canvas directly?
     */
    private initializeKeyboard(): void {
        // register keydown on the window
        window.addEventListener('keydown', this.onKeyDown.bind(this));

        // register keyup on the window
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     * Initialize mouse event handling on the Canvas
     *
     * @param canvas the Canvas to register events upon
     */
    private initializeMouse(canvas: HTMLCanvasElement): void {
        // register mousedown on the canvas
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));

        // register mouseup on the canvas
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

        // register click on the canvas
        canvas.addEventListener('click', this.onClick.bind(this));

        // register contextmenu on the canvas
        canvas.addEventListener('contextmenu', this.onContextMenu.bind(this));

        // register dblclick on the canvas
        canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));

        // register mousemove on the canvas
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
}
