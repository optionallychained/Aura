import { GLShape } from '../glShape.enum';
import { Geometry } from '../geometry';

/**
 * Built-in 3D triangular prism Geometry
 */
const h = Math.sqrt(3) / 4;
export const PRISM_TRIANGULAR = new Geometry({
    name: 'prism_triangular',
    vertices: Float32Array.from([
        // base
        -0.5, -h, -0.5,
        0.5, -h, -0.5,
        0.5, -h, 0.5,
        0.5, -h, 0.5,
        -0.5, -h, 0.5,
        -0.5, -h, -0.5,

        // front face
        -0.5, -h, 0.5,
        0.5, -h, 0.5,
        0, h, 0.5,

        // back face
        0.5, -h, -0.5,
        -0.5, -h, -0.5,
        0, h, -0.5,

        // left side
        -0.5, -h, -0.5,
        -0.5, -h, 0.5,
        0, h, 0.5,
        0, h, 0.5,
        0, h, -0.5,
        -0.5, -h, -0.5,

        // right side
        0.5, -h, 0.5,
        0.5, -h, -0.5,
        0, h, -0.5,
        0, h, -0.5,
        0, h, 0.5,
        0.5, -h, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([

    ])
});
