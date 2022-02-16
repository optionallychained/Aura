import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe tetrahedron Geometry, setting out the information required to render wireframe equilateral triangle-based pyramids
 */

const h = Math.sqrt(3) / 4;

export const TETRAHEDRON_WIREFRAME = new Geometry({
    name: 'tetrahedron_wireframe',
    vertices: Float32Array.from([
        -0.5, -h, h,
        0.5, -h, h,
        0, -h, -h,

        -0.5, -h, h,
        0, h, 0,

        0.5, -h, h,
        0, h, 0,

        0, -h, -h
    ]),
    vertexSize: 3,
    vertexCount: 8,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
