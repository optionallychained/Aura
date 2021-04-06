import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 3D line Geometry, setting out the information required to render a 3D line
 */
export const LINE = new Geometry({
    name: 'line_3d',
    vertices: Float32Array.from([
        -0.5, 0, 0,
        0.5, 0, 0
    ]),
    vertexSize: 3,
    vertexCount: 2,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([
        // TODO janky, do we want texture coordinates for lines?
        0, 0,
        1, 0
    ])
})