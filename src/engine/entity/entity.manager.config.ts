import { WebGLRenderer } from '../screen';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** EntityManager name; used for prefixing VBOs and selecting the correct texture atlas for rendering, if applicable */
    readonly name: string;
    /** The WebGLRenderer the EntityManager will use */
    readonly renderer: WebGLRenderer;

    readonly textureAtlas?: TextureAtlas;
}
