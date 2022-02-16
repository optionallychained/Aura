import { Font2DConfig } from '../../font/2d/font.2d.config';
import { UI2DConfig } from '../../ui/2d/ui.2d.config';
import { World2DConfig } from '../../world/2d/world.2d.config';
import { GameConfig } from '../game.config';

/**
 * Interface describing the Game2D Configuration object, adding 2D-relevant World, UI and Font configurations
 */
export interface Game2DConfig extends GameConfig {
    /** 2D World configuration. A little hacky maybe? */
    readonly world?: {
        dimensions?: World2DConfig['dimensions'];
        camera?: Partial<World2DConfig['camera']>;
        textureAtlas?: World2DConfig['textureAtlas'];
    };
    /** 2D UI configuration */
    readonly ui?: Omit<UI2DConfig, 'renderer'>;
    /** 2D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<Font2DConfig, 'renderer'>;
}
