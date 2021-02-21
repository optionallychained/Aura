import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 3D Wireframe box Geometry, setting out the information required to render 3D wireframe rects
 */
export const BOX = new Geometry({
    name: 'box_3d_wireframe',
    vertices: Float32Array.from([
        // TODO fix
        0, 0, 0,
        0.5, 0, 0,
        0.5, 0, 0,
        0.5, 0.5, 0,

        0.5, 0.5, 0,
        0, 0.5, 0,
        0, 0.5, 0,
        0, 0, 0,

        0, 0, 0,
        0, 0, 0.5,
        0.5, 0, 0,
        0.5, 0, 0.5,

        0.5, 0.5, 0,
        0.5, 0.5, 0.5,
        0, 0.5, 0,
        0, 0.5, 0.5,

        0, 0, 0.5,
        0.5, 0, 0.5,
        0.5, 0, 0.5,
        0.5, 0.5, 0.5,

        0.5, 0.5, 0.5,
        0, 0.5, 0.5,
        0, 0.5, 0.5,
        0, 0, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.LINES
});
