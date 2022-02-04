import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Triangle Geometry, setting out the information required to render equilateral triangles
 */

const h = Math.sqrt(3) / 4;

export const TRIANGLE = new Geometry({
    name: 'triangle_equilateral_2d',
    vertices: Float32Array.from([
        -0.5, -h,
        0.5, -h,
        0, h,
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        0, 0,
        1, 0,
        0.5, 1
    ])
});
