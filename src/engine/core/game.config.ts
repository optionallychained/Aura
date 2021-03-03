import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { TextureAtlas } from '../texture';

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
    /** World dimensions; for decoupling Entity coordinate systems from GL screenspace coords. Default value is {canvasDimensions} */
    readonly worldDimensions?: Vec2;
    /** Texture atlas configurations for preset supported atlases, allowing for per-application specification of contextual texture packs */
    readonly textureAtlasConfig?: {
        /** World Entity texture atlas path; for Entities representing game objects. No default */
        readonly world?: TextureAtlas;
        /** Text Entity texture atlas path; for Entities representing rendered strings. Default will be the built-in engine font */
        readonly text?: TextureAtlas;
        /** UI Entity texture atlas path; for Entities representing UI elements. No default */
        readonly ui?: TextureAtlas;
    };
    /** Game init function; none is provided by default */
    readonly init?: () => void
}
