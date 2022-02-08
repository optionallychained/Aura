import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 3D wireframe F Geometry, setting out the information required to render wireframe Fs
 */
export const F = new Geometry({
    name: 'f_wireframe',
    vertices: Float32Array.from([
        // front left
        -0.5, -0.5, 0.1,
        -0.25, -0.5, 0.1,
        -0.25, -0.5, 0.1,
        -0.25, -0.15, 0.1,
        -0.25, 0.05, 0.1,
        -0.25, 0.25, 0.1,
        -0.5, 0.5, 0.1,
        -0.5, -0.5, 0.1,

        // front top rung
        -0.25, 0.25, 0.1,
        0.5, 0.25, 0.1,
        0.5, 0.25, 0.1,
        0.5, 0.5, 0.1,
        0.5, 0.5, 0.1,
        -0.5, 0.5, 0.1,

        // front middle rung
        -0.25, -0.15, 0.1,
        0.2, -0.15, 0.1,
        0.2, -0.15, 0.1,
        0.2, 0.05, 0.1,
        0.2, 0.05, 0.1,
        -0.25, 0.05, 0.1,

        // back left
        -0.5, -0.5, -0.1,
        -0.25, -0.5, -0.1,
        -0.25, -0.5, -0.1,
        -0.25, -0.15, -0.1,
        -0.25, 0.05, -0.1,
        -0.25, 0.25, -0.1,
        -0.5, 0.5, -0.1,
        -0.5, -0.5, -0.1,

        // back top rung
        -0.25, 0.25, -0.1,
        0.5, 0.25, -0.1,
        0.5, 0.25, -0.1,
        0.5, 0.5, -0.1,
        0.5, 0.5, -0.1,
        -0.5, 0.5, -0.1,

        // back middle rung
        -0.25, -0.15, -0.1,
        0.2, -0.15, -0.1,
        0.2, -0.15, -0.1,
        0.2, 0.05, -0.1,
        0.2, 0.05, -0.1,
        -0.25, 0.05, -0.1,

        // left connectors
        -0.5, -0.5, 0.1,
        -0.5, -0.5, -0.1,
        -0.25, -0.5, 0.1,
        -0.25, -0.5, -0.1,
        -0.5, 0.5, 0.1,
        -0.5, 0.5, -0.1,

        // top rung connectors
        -0.25, 0.25, 0.1,
        -0.25, 0.25, -0.1,
        0.5, 0.25, 0.1,
        0.5, 0.25, -0.1,
        0.5, 0.5, 0.1,
        0.5, 0.5, -0.1,

        // middle rung connectors
        -0.25, -0.15, 0.1,
        -0.25, -0.15, -0.1,
        0.2, -0.15, 0.1,
        0.2, -0.15, -0.1,
        0.2, 0.05, 0.1,
        0.2, 0.05, -0.1,
        -0.25, 0.05, 0.1,
        -0.25, 0.05, -0.1
    ]),
    vertexSize: 3,
    vertexCount: 60,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([
        // TODO consider whether or not texcoords make sense for lines
    ])
});
