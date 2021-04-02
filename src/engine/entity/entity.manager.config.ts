import { Renderer } from '../renderer';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing a generic EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** The Renderer to use */
    readonly renderer: Renderer;
    /** An optional TextureAtlas to use in rendering managed Entities with Texture Components */
    readonly textureAtlas?: TextureAtlas;
}
