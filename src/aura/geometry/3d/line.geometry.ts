import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 3D line Geometry
 */
export const LINE = new Geometry({
    name: 'line',
    vertices: Float32Array.from([
        -0.5, 0, 0,
        0.5, 0, 0
    ]),
    vertexSize: 3,
    vertexCount: 2,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([

    ])
})
