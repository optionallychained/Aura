import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Pentagon Geometry, setting out the information required to render pentagons
 *
 * Not using POLYGON() because the resultant shape is 'rotated' strangely
 */
export const PENTAGON = new Geometry({
    name: 'pentagon_2d',
    vertices: Float32Array.from([
        0, 0.5,
        0.5, 0.1,
        0.3, -0.5,
        -0.3, -0.5,
        -0.5, 0.1
    ]),
    vertexSize: 2,
    vertexCount: 5,
    glShape: GLShape.TRIANGLE_FAN,
    textureCoordinates: Float32Array.from([
        // TODO
    ])
});
