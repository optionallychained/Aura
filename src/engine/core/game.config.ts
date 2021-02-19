import { Color, Vec2 } from '../math';

/**
 * Interface desciribing the main Game Configuration object
 *
 * @see Game
 */
export interface GameConfig {
    /** High level game 'Type'; either '2D' or '3D'; default value is '2D' */
    type: '2D' | '3D',
    /** Game Canvas dimensions; default value is (window.innerWidth, window.innerHeight) */
    canvasDimensions?: Vec2;
    /** Game Canvas ID. If not provided, a Canvas will be created */
    canvasId?: string;
    /** Game background color; default value is black */
    backgroundColor?: Color;
    /** Game control scheme, used to optimise InputManager event registrations; default value is 'keyboard' */
    controlScheme?: 'keyboard' | 'mouse' | 'both'
    /** Debug mode, enabling the display of frame data and potentially other useful stuff in the future; default value is false */
    debugMode?: boolean;
    /** Game init function; none is provided by default */
    init?: () => void
}
