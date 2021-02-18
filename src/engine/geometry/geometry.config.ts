import { Vec2 } from '../math';
import { GLShape } from './glShape.enum';

/**
 * Interface describing a Geometry's configuration object
 */
export interface GeometryConfig {
    /** A name for the Geometry */
    readonly name: string;
    /** The vertices that make up the Geometry */
    readonly vertices: Array<Vec2>;
    /** The size of each of the Geometry's vertices */
    readonly vertexSize: number;
    /** The number of Vertices making up the Geometry */
    readonly vertexCount: number;
    /** The GLShape (drawing mode) the Geometry should be rendered with */
    readonly glShape: GLShape;
}
