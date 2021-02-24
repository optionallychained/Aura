import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 3D Wireframe box Geometry, setting out the information required to render wireframe cubes
 */
export const BOX = new Geometry({
    name: 'box_3d_wireframe',
    vertices: Float32Array.from([
        // top face
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        // bottom face
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,

        // back right connector
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,

        // back left connector
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,

        // front left connector
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

        // front right connector
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.LINES
});
