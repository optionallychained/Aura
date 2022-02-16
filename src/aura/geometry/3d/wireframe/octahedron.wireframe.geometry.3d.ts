import { GLShape } from '../../glShape.enum';
import { Geometry } from '../../geometry';

/**
 * Built-in 3D wireframe octahedron Geometry, setting out the information required to render wireframe diamonds
 */

const h = Math.sqrt(3) / 4;

export const OCTAHEDRON_WIREFRAME = new Geometry({
    name: 'octahedron_wireframe',
    vertices: Float32Array.from([
        0, -h, 0,
        0.5, 0, 0.5,
        -0.5, 0, 0.5,

        0, h, 0,
        0.5, 0, 0.5,

        0.5, 0, -0.5,
        0, -h, 0,

        -0.5, 0, -0.5,
        0.5, 0, -0.5,
        0, h, 0,

        -0.5, 0, -0.5,
        -0.5, 0, 0.5
    ]),
    vertexSize: 3,
    vertexCount: 12,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
