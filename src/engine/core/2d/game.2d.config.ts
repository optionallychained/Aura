import { Font2DConfig } from '../../font/2d';
import { UI2DConfig } from '../../ui/2d';
import { World2DConfig } from '../../world/2d';
import { GameConfig } from '../game.config';

/**
 * Interface describing the Game2D Configuration object, adding 2D-relevant World configuration
 */
export interface Game2DConfig extends GameConfig {
    /** 2D World configuration; world size is defaulted to the Canvas size */
    readonly world?: Partial<Omit<World2DConfig, 'renderer'>>;
    /** 2D UI configuration */
    readonly ui?: Omit<UI2DConfig, 'renderer'>;
    /** 2D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<Font2DConfig, 'renderer'>;
}
