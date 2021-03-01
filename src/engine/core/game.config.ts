import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';

/**
 * Interface desciribing the main Game Configuration object
 *
 * @see Game
 */
export interface GameConfig {
    /** Game Canvas dimensions; default value is (window.innerWidth, window.innerHeight) */
    readonly canvasDimensions?: Vec2;
    /** Game Canvas ID. If not provided, a Canvas will be created */
    readonly canvasId?: string;
    /** Game background color; default value is black */
    readonly backgroundColor?: Color;
    /** Game control scheme, used to optimise InputManager event registrations; default value is 'keyboard' */
    readonly controlScheme?: ControlScheme;
    /** Debug mode, enabling the display of frame data and potentially other useful stuff in the future; default value is false */
    readonly debugMode?: boolean;
    /** File path for the texture atlas containing textures for world Entities. If not provided, textures will not be used */
    readonly worldTextureAtlasPath?: string;
    /** Game init function; none is provided by default */
    readonly init?: () => void
}
