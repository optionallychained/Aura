import { ControlScheme } from '../input';
import { Color, Vec2 } from '../math';
import { TextureAtlas } from '../texture';

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
 * Interface describing the generic Game configuration defaults object
 */
export interface GameConfigDefaults {
    canvasDimensions: Vec2;
    backgroundColor: Color;
    controlScheme: ControlScheme;
    fontAtlas: TextureAtlas;
    fontCharset: Array<string>;
}
