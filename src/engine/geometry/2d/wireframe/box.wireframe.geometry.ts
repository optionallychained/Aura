import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe box Geometry, setting out the information required to render wireframe quads
 */
export const BOX = new Geometry({
    name: 'box_2d_wireframe',
    vertices: Float32Array.from([
        0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]),
    vertexSize: 2,
    vertexCount: 4,
    glShape: GLShape.LINE_LOOP
});
