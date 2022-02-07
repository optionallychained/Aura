import { GLShape } from '../glShape.enum';
import { Geometry } from '../geometry';

/**
 * Built-in 3D prism Geometry, setting out the information required to render hexagonal prisms
 */

const h = Math.sqrt(3) / 4;

export const PRISM_HEXAGONAL = new Geometry({
    name: 'prism_hexagonal',
    vertices: Float32Array.from([
        // bottom hexagon
        -0.25, -0.5, h,
        0.25, -0.5, h,
        0, -0.5, 0,

        0.25, -0.5, h,
        0.5, -0.5, 0,
        0, -0.5, 0,

        0.5, -0.5, 0,
        0.25, -0.5, -h,
        0, -0.5, 0,

        0.25, -0.5, -h,
        -0.25, -0.5, -h,
        0, -0.5, 0,

        -0.25, -0.5, -h,
        -0.5, -0.5, 0,
        0, -0.5, 0,

        -0.5, -0.5, 0,
        -0.25, -0.5, h,
        0, -0.5, 0,

        // top hexagon
        -0.25, 0.5, h,
        0.25, 0.5, h,
        0, 0.5, 0,

        0.25, 0.5, h,
        0.5, 0.5, 0,
        0, 0.5, 0,

        0.5, 0.5, 0,
        0.25, 0.5, -h,
        0, 0.5, 0,

        0.25, 0.5, -h,
        -0.25, 0.5, -h,
        0, 0.5, 0,

        -0.25, 0.5, -h,
        -0.5, 0.5, 0,
        0, 0.5, 0,

        -0.5, 0.5, 0,
        -0.25, 0.5, h,
        0, 0.5, 0,

        // front face
        -0.25, -0.5, h,
        0.25, -0.5, h,
        0.25, 0.5, h,
        0.25, 0.5, h,
        -0.25, 0.5, h,
        -0.25, -0.5, h,

        // right front face
        0.25, -0.5, h,
        0.5, -0.5, 0,
        0.5, 0.5, 0,
        0.5, 0.5, 0,
        0.25, 0.5, h,
        0.25, -0.5, h,

        // right back face
        0.5, -0.5, 0,
        0.25, -0.5, -h,
        0.25, 0.5, -h,
        0.25, 0.5, -h,
        0.5, 0.5, 0,
        0.5, -0.5, 0,

        // back face
        0.25, -0.5, -h,
        -0.25, -0.5, -h,
        -0.25, 0.5, -h,
        -0.25, 0.5, -h,
        0.25, 0.5, -h,
        0.25, -0.5, -h,

        // left back face
        -0.25, -0.5, -h,
        -0.5, -0.5, 0,
        -0.5, 0.5, 0,
        -0.5, 0.5, 0,
        -0.25, 0.5, -h,
        -0.25, -0.5, -h,

        // left front face
        -0.5, -0.5, 0,
        -0.25, -0.5, h,
        -0.25, 0.5, h,
        -0.25, 0.5, h,
        -0.5, 0.5, 0,
        -0.5, -0.5, 0,
    ]),
    vertexSize: 3,
    vertexCount: 72,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([

    ])
});
