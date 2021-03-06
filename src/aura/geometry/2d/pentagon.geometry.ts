import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D pentagon Geometry
 */
export const PENTAGON = new Geometry({
    name: 'pentagon',
    vertices: Float32Array.from([
        -0.3, -0.5,
        0.3, -0.5,
        0.5, 0.1,
        0, 0.5,
        -0.5, 0.1
    ]),
    vertexSize: 2,
    vertexCount: 5,
    glShape: GLShape.TRIANGLE_FAN,
    textureCoordinates: Float32Array.from([

    ])
});
