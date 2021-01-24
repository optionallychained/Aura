import { Vec3 } from '../math/vec3';

/**
 * Interface desciribing the main Game Configuration object
 *
 * // TODO potentially take controlScheme out of here and into its own structure (see InputManager)
 */
export interface GameConfig {
    /** Game window width; default value is window.innerWidth */
    width?: number;
    /** Game window height; default value is window.innerHeight */
    height?: number;
    /** Game Canvas ID. If not provided, a Canvas will be created */
    canvasId?: string;
    /** Game background color; default value is black */
    backgroundColor?: Vec3;
    /** Game control scheme, used to optimise InputManager event registrations; default value is 'keyboard' */
    controlScheme?: 'keyboard' | 'mouse' | 'both'
    /** Debug mode, enabling the display of frame data and potentially other useful stuff in the future; default value is false */
    debugMode?: boolean;
    /** Game init function; none is provided by default */
    init?: () => void
}
