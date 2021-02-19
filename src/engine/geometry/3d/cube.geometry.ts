import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

export const CUBE = new Geometry({
    name: 'cube',
    vertices: Float32Array.from([
        // TODO fix
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

        0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,

        0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,

        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,

        -0.5, -0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,

        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,

        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,

        0.5, 0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,

        0.5, -0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,

        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,

        0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,

        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, -0.5, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 36,
    glShape: GLShape.TRIANGLES
});
