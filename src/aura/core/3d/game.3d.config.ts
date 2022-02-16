import { Font3DConfig } from '../../font/3d/font.3d.config';
import { UI3DConfig } from '../../ui/3d/ui.3d.config';
import { World3DConfig } from '../../world/3d/world.3d.config';
import { GameConfig } from '../game.config';

/**
 * Interface describing the Game3D Configuration object, adding 3D-relevant World, UI and Font configurations
 */
export interface Game3DConfig extends GameConfig {
    /** 3D World configuration; A little hacky maybe? */
    readonly world?: {
        dimensions?: World3DConfig['dimensions'];
        camera?: Partial<World3DConfig['camera']>;
        textureAtlas?: World3DConfig['textureAtlas'];
    };
    /** 3D UI configuration */
    readonly ui?: Omit<UI3DConfig, 'renderer'>;
    /** 3D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<Font3DConfig, 'renderer'>;
}
