import { Vec2 } from '../math';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing a World configuration object
 */
export interface WorldConfig {
    /** World dimensions, decoupled from both clip space and viewport size */
    readonly dimensions?: Vec2;
    /** An optional TextureAtlas to use in rendering game objects with Textures */
    readonly textureAtlas?: TextureAtlas;
}
