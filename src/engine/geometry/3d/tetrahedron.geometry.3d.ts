import { GLShape } from '../glShape.enum';
import { Geometry } from '../geometry';

/**
 * Built-in 3D tetrahedron Geometry, setting out the information required to render equilateral triangle-based pyramids
 */

const h = Math.sqrt(3) / 4;

export const TETRAHEDRON = new Geometry({
    name: 'tetrahedron',
    vertices: Float32Array.from([
        // bottom
        -0.5, -h, h,
        0, -h, -h,
        0.5, -h, h,

        // face 1
        0.5, -h, h,
        0, h, 0,
        -0.5, -h, h,

        // face 2
        -0.5, -h, h,
        0, -h, -h,
        0, h, 0,

        // face 3
        0, -h, -h,
        0, h, 0,
        0.5, -h, h,
    ]),
    vertexSize: 3,
    vertexCount: 36,
    glShape: GLShape.TRIANGLES,
    textureCoordinates: Float32Array.from([

    ])
});
