import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe pyramid Geometry, setting out the information required to render wireframe hexagon-based pyramids
 */

const h = Math.sqrt(3) / 4;

export const PYRAMID_HEXAGONAL_WIREFRAME = new Geometry({
    name: 'pyramid_hexagonal_wireframe',
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
        0, 0.5, 0,

        // right front face
        0.25, -0.5, h,
        0, 0.5, 0,

        // right back face
        0.5, -0.5, 0,
        0, 0.5, 0,

        // back face
        0.25, -0.5, -h,
        0, 0.5, 0,

        // left back face
        -0.25, -0.5, -h,
        0, 0.5, 0,

        // left front face
        -0.5, -0.5, 0
    ]),
    vertexSize: 3,
    vertexCount: 17,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
