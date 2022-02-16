import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe prism Geometry, setting out the information required to render wireframe hexagonal prisms
 */

const h = Math.sqrt(3) / 4;

export const PRISM_HEXAGONAL_WIREFRAME = new Geometry({
    name: 'prism_hexagonal_wireframe',
    vertices: Float32Array.from([
        // base
        -0.25, -0.5, h,
        0.25, -0.5, h,
        0.5, -0.5, 0,
        0.25, -0.5, -h,
        -0.25, -0.5, -h,
        -0.5, -0.5, 0,

        // front face
        -0.25, -0.5, h,
        -0.25, 0.5, h,
        0.25, 0.5, h,
        0.25, -0.5, h,

        // right front face
        0.25, 0.5, h,
        0.5, 0.5, 0,
        0.5, -0.5, 0,

        // right back face
        0.5, 0.5, 0,
        0.25, 0.5, -h,
        0.25, -0.5, -h,

        // back face
        0.25, 0.5, -h,
        -0.25, 0.5, -h,
        -0.25, -0.5, -h,

        // left back face
        -0.25, 0.5, -h,
        -0.5, 0.5, 0,
        -0.5, -0.5, 0,

        // left front face
        -0.5, 0.5, 0,
        -0.25, 0.5, h
    ]),
    vertexSize: 3,
    vertexCount: 24,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
