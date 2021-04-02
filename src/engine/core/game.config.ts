import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { FontConfig2D, FontConfig3D } from '../font';
import { TextureAtlas } from '../texture';
import { UIConfig2D, UIConfig3D } from '../ui';
import { WorldConfig2D, WorldConfig3D } from '../world';

/**
 * Interface describing the generic Game Configuration object, with configuration for both 2D and 3D games
 *
 * All configuration is optional; default values will be provided if unprovided
 */
export interface GameConfig {
    /** Dimensions of the Canvas; default value is (window.innerWidth, window.innerHeight) */
    readonly canvasDimensions?: Vec2;
    /** ID of the Canvas; a Canvas will be created if not provided */
    readonly canvasId?: string;
    /** Background Color for the Game; default value is black */
    readonly backgroundColor?: Color;
    /** Game Control Scheme; default value is 'keyboard' */
    readonly controlScheme?: ControlScheme;
    /** Debug Mode, enabling game stat display; default value is false */
    readonly debugMode?: boolean;
    /** Game init function; none is provided by default */
    readonly init?: () => void;
}

/**
 * Interface describing the Game2D Configuration object, adding 2D-relevant World configuration
 */
export interface GameConfig2D extends GameConfig {
    /** 2D World configuration; world size is defaulted to the Canvas size */
    readonly world?: Partial<Omit<WorldConfig2D, 'renderer'>>;
    /** 2D UI configuration */
    readonly ui?: Omit<UIConfig2D, 'renderer'>;
    /** 2D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<FontConfig2D, 'renderer'>;
}

/**
 * Interface describing the Game3D Configuration object, adding 3D-relevant World configuration
 */
export interface GameConfig3D extends GameConfig {
    /** 3D World configuration; world size is defaulted to the Canvas size, with a z size of 1000 */
    readonly world?: Partial<Omit<WorldConfig3D, 'renderer'>>;
    /** 3D UI configuration */
    readonly ui?: Omit<UIConfig3D, 'renderer'>;
    /** 3D Font configuration; defaults to the built-in font + charset */
    readonly font?: Omit<FontConfig3D, 'renderer'>;
}

/**
 * Interface describing the generic Game configuration defaults object
 */
export interface GameConfigDefaults {
    canvasDimensions: Vec2;
    backgroundColor: Color;
    controlScheme: ControlScheme;
    fontAtlas: TextureAtlas;
    fontCharset: Array<string>;
}
