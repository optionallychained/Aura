import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D right angle triangle Geometry
 */
export const TRIANGLE_RIGHT_ANGLE = new Geometry({
    name: 'triangle_right_angle',
    vertices: Float32Array.from([
        -0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        0, 0,
        1, 0,
        0, 1
    ])
});
