import { WebGLRenderer } from '../screen';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** Prefix for all VBOs created by this EntityManager; facilitating use of multiple EntityManagers per Game */
    vboPrefix: string;
    /** The WebGLRenderer the EntityManager will use */
    renderer: WebGLRenderer;
}
