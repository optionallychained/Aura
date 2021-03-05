import { GLShape } from './glShape.enum';

/**
 * Interface describing a Geometry's configuration object
 */
export interface GeometryConfig {
    /** A name for the Geometry */
    readonly name: string;
    /** The vertices that make up the Geometry */
    readonly vertices: Float32Array;
    /** The size of each of the Geometry's vertices */
    readonly vertexSize: number;
    /** The number of Vertices making up the Geometry */
    readonly vertexCount: number;
    /** The GLShape (drawing mode) the Geometry should be rendered with */
    readonly glShape: GLShape;
    /** Texture coordinates for each vertex in the Geometry's vertices */
    readonly textureCoordinates: Float32Array;
}
