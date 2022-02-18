import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe triangular prism Geometry
 */
const h = Math.sqrt(3) / 4;
export const PRISM_TRIANGULAR_WIREFRAME = new Geometry({
    name: 'prism_triangular_wireframe',
    vertices: Float32Array.from([
        -0.5, -h, 0.5,
        0.5, -h, 0.5,
        0.5, -h, -0.5,
        -0.5, -h, -0.5,

        -0.5, -h, 0.5,
        0, h, 0.5,
        0.5, -h, 0.5,

        0.5, -h, -0.5,
        0, h, -0.5,
        0, h, 0.5,

        0, h, -0.5,
        -0.5, -h, -0.5,
    ]),
    vertexSize: 3,
    vertexCount: 12,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
