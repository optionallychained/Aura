import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D square Geometry, setting out the information required to render quads
 */
export const SQUARE = new Geometry({
    name: 'square',
    vertices: Float32Array.from([
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5,

        0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5
    ]),
    vertexSize: 2,
    vertexCount: 6,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        0, 0,
        1, 0,
        1, 1,

        1, 1,
        0, 1,
        0, 0
    ])
});
