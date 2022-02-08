import { GLShape } from '../glShape.enum';
import { Geometry } from '../geometry';

/**
 * Built-in 3D pyramid Geometry, setting out the information required to render square-based pyramids
 */

const h = Math.sqrt(3) / 4;

export const PYRAMID_SQUARE = new Geometry({
    name: 'pyramid_square',
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
        0, h, 0,

        // left face
        -0.5, -h, -0.5,
        -0.5, -h, 0.5,
        0, h, 0,

        // back face
        0.5, -h, -0.5,
        -0.5, -h, -0.5,
        0, h, 0,

        // right face
        0.5, -h, 0.5,
        0.5, -h, -0.5,
        0, h, 0
    ]),
    vertexSize: 3,
    vertexCount: 18,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([
        // TODO Square Pyramid texcoords
    ])
});
