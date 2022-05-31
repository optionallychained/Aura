import { ShaderProgram } from '../shader/program/shaderProgram';
import { ControlScheme } from '../input/controlScheme.type';
import { Color } from '../math/color';
import { Vec2 } from '../math/vec2';
import { TextureAtlas } from '../texture/textureAtlas';

/**
 * Interface describing the generic Game Configuration object, with configuration relevant both to 2D and 3D games
 *
 * All configuration is optional; default values will be provided if unprovided
 */
export interface GameConfigBase {
    /** Dimensions of the Canvas; default value is (window.innerWidth, window.innerHeight) */
    readonly canvasDimensions?: Vec2;
    /** ID of the Canvas; a Canvas will be created if not provided */
    readonly canvasId?: string;
    /** ID or HTMLElement of the container to place an automatically-created Canvas within */
    readonly canvasParent?: string | HTMLElement;
    /** Background Color for the Game; default value is black */
    readonly backgroundColor?: Color;
    /** Game Control Scheme; default value is 'keyboard' */
    readonly controlScheme?: ControlScheme;
    /** Sounds to load on game init */
    readonly sounds?: Array<{ name: string, filePath: string }>;
    /** Shaders to register on init; overrides the default set if provided */
    readonly shaders?: Array<ShaderProgram>;
    /** Debug Mode, enabling game stat display; default value is false */
    readonly debugMode?: boolean;
    /** Game init function; none is provided by default */
    readonly init?: () => void;
}

/**
 * Interface describing the generic Game configuration defaults object, just used to type-secure the generic Game's defaults
 */
export interface GameConfigDefaults {
    canvasDimensions: Vec2;
    canvasParent: HTMLElement;
    backgroundColor: Color;
    controlScheme: ControlScheme;
    textAtlas: TextureAtlas;
    textCharset: Array<string>;
}
