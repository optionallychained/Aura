import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { FontConfig } from '../text/font.config';
import { UIConfig } from '../ui';
import { WorldConfig } from '../world';

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
    /** Optional configuration for the Game's World */
    readonly world?: Partial<Omit<WorldConfig, 'renderer'>>;
    /** Optional configuration for the Game's UI */
    readonly ui?: Omit<UIConfig, 'renderer'>;
    /** Optional configuration for the Game's Font */
    readonly font?: Omit<FontConfig, 'renderer'>;
    /** Game init function; none is provided by default */
    readonly init?: () => void
}
