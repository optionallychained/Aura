import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Triangle Geometry, setting out the information required to render right angle triangles
 */
export const TRIANGLE_RIGHT_ANGLE = new Geometry({
    name: 'triangle_right_angle_2d',
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
