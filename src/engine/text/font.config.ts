import { TextureAtlas } from '../texture';

/**
 * Interface desciribing a Font configuration object
 */
export interface FontConfig {
    /** TextureAtlas to use in rendering characters */
    readonly textureAtlas: TextureAtlas;
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
