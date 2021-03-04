import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { FontConfig } from '../text/font.config';
import { UIConfig } from '../ui';
import { WorldConfig } from '../world/world.config';

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
    /** World dimensions; for decoupling Entity coordinate systems from GL screenspace coords. Default value is {canvasDimensions} */
    readonly worldDimensions?: Vec2;


    readonly uiConfig?: UIConfig
    readonly worldConfig?: WorldConfig;
    readonly fontConfig?: FontConfig;

    /** Game init function; none is provided by default */
    readonly init?: () => void
}
