import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 3D point Geometry, setting out the information required to render a point
 */
export const POINT = new Geometry({
    name: 'point',
    vertices: Float32Array.from([
        0, 0, 0
    ]),
    vertexSize: 3,
    vertexCount: 1,
    glShape: GLShape.POINTS,
    textureCoordinates: Float32Array.from([
        // TODO janky, do we want texture coordinates for points?
        0.5, 0.5
    ])
});
