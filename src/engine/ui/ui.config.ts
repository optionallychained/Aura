import { TextureAtlas } from '../texture';

/**
 * Interface desciribing a UI configuration object
 */
export interface UIConfig {
    /** An optional TextureAtlas to use in rendering UI elements with Textures */
    textureAtlas?: TextureAtlas;
}
