import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D box Geometry, setting out the information required to render quads
 */
export const BOX = new Geometry({
    name: 'box',
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
