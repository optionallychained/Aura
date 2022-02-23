import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 3D point Geometry
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

    ])
});
