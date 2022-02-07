import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D F Geometry, setting out the information required to render Fs
 */
export const F = new Geometry({
    name: 'f',
    vertices: Float32Array.from([
        // left side
        -0.5, -0.5,
        -0.25, -0.5,
        -0.25, 0.5,
        -0.25, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,

        // top rung
        -0.25, 0.25,
        0.5, 0.25,
        0.5, 0.5,
        0.5, 0.5,
        -0.25, 0.5,
        -0.25, 0.25,

        // middle rung
        -0.25, -0.15,
        0.2, -0.15,
        0.2, 0.05,
        0.2, 0.05,
        -0.25, 0.05,
        -0.25, -0.15
    ]),
    vertexSize: 2,
    vertexCount: 18,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        // TODO
    ])
});
