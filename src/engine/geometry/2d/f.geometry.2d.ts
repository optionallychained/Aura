import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D F Geometry, setting out the information required to render Fs
 */
export const F = new Geometry({
    name: 'f_2d',
    vertices: Float32Array.from([
        // left side
        -0.5, 0.5,
        -0.25, 0.5,
        -0.25, -0.5,
        -0.25, -0.5,
        -0.5, -0.5,
        -0.5, 0.5,

        // top rung
        -0.25, 0.5,
        0.3, 0.5,
        0.3, 0.25,
        0.3, 0.25,
        -0.25, 0.25,
        -0.25, 0.5,

        // middle rung
        -0.25, 0.05,
        0.1, 0.05,
        0.1, -0.15,
        0.1, -0.15,
        -0.25, -0.15,
        -0.25, 0.05
    ]),
    vertexSize: 2,
    vertexCount: 18,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        // TODO
    ])
});
