import { Font3DConfig } from '../../font/3d';
import { UI3DConfig } from '../../ui/3d';
import { World3DConfig } from '../../world/3d';
import { GameConfig } from '../game.config';

/**
 * Interface describing the Game3D Configuration object, adding 3D-relevant World, UI and Font configurations
 */
export interface Game3DConfig extends GameConfig {
    /** 3D World configuration; world size is defaulted to the Canvas size, with a z size of 1000 */
    readonly world?: Partial<Omit<World3DConfig, 'renderer'>>;
    /** 3D UI configuration */
    readonly ui?: Omit<UI3DConfig, 'renderer'>;
    /** 3D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<Font3DConfig, 'renderer'>;
}
