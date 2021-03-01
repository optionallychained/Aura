import { WebGLRenderer } from '../screen';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** Prefix for all VBOs created by this EntityManager; facilitating use of multiple EntityManagers per Game */
    readonly vboPrefix: string;
    /** Name of a texture atlas that this EntityManager will use in rendering its Entities; if applicable */
    readonly textureAtlasName?: string;
    /** The WebGLRenderer the EntityManager will use */
    readonly renderer: WebGLRenderer;
}
