import { WebGLRenderer } from '../renderer';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** The WebGLRenderer the EntityManager will use */
    readonly renderer: WebGLRenderer;
    /** An optional TextureAtlas to use in rendering managed Entities with Texture Componnets */
    readonly textureAtlas?: TextureAtlas;
}
