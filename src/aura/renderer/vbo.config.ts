import { GLShape } from '../geometry/glShape.enum';

/**
 * Interface describing a VBO configuration object, containing all the information required by the EntityManager and Renderer to effectively
 *   construct, maintain and render Entity vertex lists in appropriate batches
 */
export interface VBOConfig {
    /** A name for the VBO */
    readonly name: string;
    /** The vertices comprising the VBO */
    readonly vertices: Float32Array;
    /** The size of the vertices comprising the VBO */
    readonly vertexSize: number;
    /** The number of vertices per Entity described by the VBO */
    readonly verticesPerEntity: number;
    /** The GLShape (drawing mode) to render the vertices with */
    readonly glShape: GLShape;
    /** A flag indicating whether or not the VBO has been modified on a frame-to-frame basis, thereby requiring (re)buffering to the GPU */
    changed: boolean;
}
