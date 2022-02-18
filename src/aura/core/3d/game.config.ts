import { TextConfig } from '../../text/3d/text.config';
import { UIConfig } from '../../ui/3d/ui.config';
import { WorldConfig } from '../../world/3d/world.config';
import { GameConfigBase } from '../game.config.base';

/**
 * Interface describing the 3D Game Configuration object, with configuration relevant to 3D Games
 */
export interface GameConfig extends GameConfigBase {
    /** 3D World configuration */
    readonly world?: {
        dimensions?: WorldConfig['dimensions'];
        camera?: Partial<WorldConfig['camera']>;
        textureAtlas?: WorldConfig['textureAtlas'];
    };
    /** 3D UI configuration */
    readonly ui?: Omit<UIConfig, 'renderer'>;
    /** 3D Text configuration; defaults to the built-in font + charset */
    readonly text?: Omit<TextConfig, 'renderer'>;
}
