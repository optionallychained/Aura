import { GLShape } from '../geometry';

/**
 * Interface describing a VBO configuration object, containing all the information required by the EntityManager and WebGLRenderer to
 *   effectively construct, maintain and render Entity vertex lists in appropriate batches
 *
 * @see WebGLRenderer
 * @see EntityManager
 */
export interface VBOConfig {
    /** The name of the VBO */
    name: string;
    /** The vertices comprising the VBO */
    vertices: Float32Array;
    /** The size of the vertices comprising the VBO */
    vertexSize: number;
    /** The number of vertices contained within the vertex list */
    vertexCount: number;
    /** The GLShape (drawing mode) to render the vertices in */
    glShape: GLShape;
    /** A flag indicating whether or not the VBO has been modified on a frame-to-frame basis, thereby requiring (re)buffering to the GPU */
    changed: boolean;
}
