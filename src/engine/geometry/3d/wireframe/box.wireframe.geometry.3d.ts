import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 3D Wireframe box Geometry, setting out the information required to render wireframe cubes
 */
export const BOX = new Geometry({
    name: 'box_3d_wireframe',
    vertices: Float32Array.from([
        // front face
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,

        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,

        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,

        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,

        // back face
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,

        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,

        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,

        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,

        // bottom left connector
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,

        // bottom right connector
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,

        // top right connector
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,

        // top left connector
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([
        // TODO janky...do we even want texturing for wireframes?

        // front face
        0, 0,
        1, 0,

        1, 0,
        1, 1,

        1, 1,
        0, 1,

        0, 1,
        0, 0,

        // back face
        0, 0,
        1, 0,

        1, 0,
        1, 1,

        1, 1,
        0, 1,

        0, 1,
        0, 0,

        // bottom left connector
        0, 0,
        1, 0,

        // bottom right connector
        0, 0,
        1, 0,

        // top right connector
        0, 1,
        1, 1,

        // top left connector
        0, 1,
        1, 1
    ])
});
