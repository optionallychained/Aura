import { WebGLRenderer } from '../screen';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** EntityManager name; used for prefixing VBOs and selecting the correct texture atlas for rendering, if applicable */
    readonly name: string;
    /** Name of a texture atlas that this EntityManager will use in rendering its Entities; if applicable */
    textureAtlasPath?: string;
    /** The WebGLRenderer the EntityManager will use */
    readonly renderer: WebGLRenderer;
}
