/**
 * Enum mapping convenient Key names to their KeyboardEvent code counterparts
 *
 * For use in asking the game if a key is down:
 *
 *     ```
 *     if (game.inputManager.keyPressed(Keys.ARROW_LEFT)) { ... }
 *     ```
 *
 * // TODO technically supports alternative keyboard layouts by way of (KeyboardEvent).code but it might be nice to provide alt key names
 *   for those layouts?
 */
export enum Keys {
    // letters
    A = 'KeyA',
    B = 'KeyB',
    C = 'KeyC',
    D = 'KeyD',
    E = 'KeyE',
    F = 'KeyF',
    G = 'KeyG',
    H = 'KeyH',
    I = 'KeyI',
    J = 'KeyJ',
    K = 'KeyK',
    L = 'KeyL',
    M = 'KeyM',
    N = 'KeyN',
    O = 'KeyO',
    P = 'KeyP',
    Q = 'KeyQ',
    R = 'KeyR',
    S = 'KeyS',
    T = 'KeyT',
    U = 'KeyU',
    V = 'KeyV',
    W = 'KeyW',
    X = 'KeyX',
    Y = 'KeyY',
    Z = 'KeyZ',

    //Numbers
    NUM_1 = 'Digit1',
    NUM_2 = 'Digit2',
    NUM_3 = 'Digit3',
    NUM_4 = 'Digit4',
    NUM_5 = 'Digit5',
    NUM_6 = 'Digit6',
    NUM_7 = 'Digit7',
    NUM_8 = 'Digit8',
    NUM_9 = 'Digit9',
    NUM_0 = 'Digit0',

    //Numpad
    NUM_PAD_1 = 'Numpad1',
    NUM_PAD_2 = 'Numpad2',
    NUM_PAD_3 = 'Numpad3',
    NUM_PAD_4 = 'Numpad4',
    NUM_PAD_5 = 'Numpad5',
    NUM_PAD_6 = 'Numpad6',
    NUM_PAD_7 = 'Numpad7',
    NUM_PAD_8 = 'Numpad8',
    NUM_PAD_9 = 'Numpad9',
    NUM_PAD_0 = 'Numpad0',

    //Arrows
    ARROW_LEFT = 'ArrowLeft',
    ARROW_RIGHT = 'ArrowRight',
    ARROW_UP = 'ArrowUp',
    ARROW_DOWN = 'ArrowDown',

    //Function Keys
    F_1 = 'F1',
    F_2 = 'F2',
    F_3 = 'F3',
    F_4 = 'F4',
    F_5 = 'F5',
    F_6 = 'F6',
    F_7 = 'F7',
    F_8 = 'F8',
    F_9 = 'F9',
    F_10 = 'F10',
    F_11 = 'F11',
    F_12 = 'F12',

    //Misc
    SPACE = 'Space',
    ENTER = 'Enter',
    SHIFT_LEFT = 'ShiftLeft',
    SHIFT_RIGHT = 'ShiftRight',
    CTRL_LEFT = 'ControlLeft',
    CTRL_RIGHT = 'ControlRight',
    ESC = 'Escape'
}
