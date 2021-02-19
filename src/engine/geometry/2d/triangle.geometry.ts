import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Triangle Geometry, setting out the information required to render triangles
 */
export const TRIANGLE = new Geometry({
    name: 'triangle',
    vertices: Float32Array.from([
        0, 0.5,
        -0.5, 0,
        0.5, 0
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.TRIANGLES
});
