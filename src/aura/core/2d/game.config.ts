import { State } from '../../aura.2d';
import { TextConfig } from '../../text/2d/text.config';
import { UIConfig } from '../../ui/2d/ui.config';
import { WorldConfig } from '../../world/2d/world.config';
import { GameConfigBase } from '../game.config.base';

/**
 * Interface describing the 2D Game Configuration object, with configuration relevant to 2D Games
 */
export interface GameConfig extends GameConfigBase {
    /** 2D World configuration */
    readonly world?: {
        dimensions?: WorldConfig['dimensions'];
        camera?: Partial<WorldConfig['camera']>;
        textureAtlas?: WorldConfig['textureAtlas'];
    };
    /** 2D UI configuration */
    readonly ui?: Omit<UIConfig, 'renderer'>;
    /** 2D Text configuration; defaults to the built-in font + charset */
    readonly text?: Omit<TextConfig, 'renderer'>;
    /** 2D State configuration */
    readonly states?: Array<State>;
}
