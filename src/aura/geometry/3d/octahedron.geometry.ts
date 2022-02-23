import { GLShape } from '../glShape.enum';
import { Geometry } from '../geometry';

/**
 * Built-in 3D octahedron Geometry
 */
const h = Math.sqrt(3) / 4;
export const OCTAHEDRON = new Geometry({
    name: 'octahedron',
    vertices: Float32Array.from([
        // bottom front
        0, -h, 0,
        0.5, 0, 0.5,
        -0.5, 0, 0.5,

        // bottom left
        0, -h, 0,
        -0.5, 0, 0.5,
        -0.5, 0, -0.5,

        // bottom back
        0, -h, 0,
        -0.5, 0, -0.5,
        0.5, 0, -0.5,

        // bottom right
        0, -h, 0,
        0.5, 0, -0.5,
        0.5, 0, 0.5,

        // top front
        0, h, 0,
        -0.5, 0, 0.5,
        0.5, 0, 0.5,

        // top left
        0, h, 0,
        -0.5, 0, -0.5,
        -0.5, 0, 0.5,

        // top back
        0, h, 0,
        0.5, 0, -0.5,
        -0.5, 0, -0.5,

        // top right
        0, h, 0,
        0.5, 0, 0.5,
        0.5, 0, -0.5
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([

    ])
});
