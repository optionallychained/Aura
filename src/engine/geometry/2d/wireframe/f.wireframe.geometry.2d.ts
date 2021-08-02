import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe F Geometry, setting out the information required to render Wireframe Fs
 */
export const F = new Geometry({
    name: 'f_2d_wireframe',
    vertices: Float32Array.from([
        // draw an outline of an F just specifying the corners
        -0.5, 0.5,
        0.3, 0.5,
        0.3, 0.25,
        -0.25, 0.25,
        -0.25, 0.05,
        0.1, 0.05,
        0.1, -0.15,
        -0.25, -0.15,
        -0.25, -0.5,
        -0.5, -0.5
    ]),
    vertexSize: 2,
    vertexCount: 10,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([
        // TODO
    ])
});
