import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 3D Wireframe cube Geometry, setting out the information required to render wireframe cubes
 */
export const CUBE_WIREFRAME = new Geometry({
    name: 'cube_wireframe',
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

    ])
});
