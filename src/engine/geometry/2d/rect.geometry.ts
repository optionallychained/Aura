import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Rect Geometry, setting out the information required to render quads
 */
export const RECT = new Geometry({
    name: 'rect',
    vertices: Float32Array.from([
        0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,

        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5
    ]),
    vertexSize: 2,
    vertexCount: 6,
    glShape: GLShape.TRIANGLES
});
