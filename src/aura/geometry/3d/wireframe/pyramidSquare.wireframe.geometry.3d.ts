import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe pyramid Geometry, setting out the information required to render wireframe square-based pyramids
 */

const h = Math.sqrt(3) / 4;

export const PYRAMID_SQUARE_WIREFRAME = new Geometry({
    name: 'pyramid_square_wireframe',
    vertices: Float32Array.from([
        -0.5, -h, 0.5,
        0.5, -h, 0.5,
        0.5, -h, -0.5,
        -0.5, -h, -0.5,

        -0.5, -h, 0.5,
        0, h, 0,

        -0.5, -h, -0.5,
        0, h, 0,

        0.5, -h, -0.5,
        0, h, 0,

        0.5, -h, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 11,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
