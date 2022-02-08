import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D line Geometry, setting out the information required to render a 2D line
 */
export const LINE = new Geometry({
    name: 'line',
    vertices: Float32Array.from([
        -0.5, 0,
        0.5, 0
    ]),
    vertexSize: 2,
    vertexCount: 2,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([
        // TODO consider whether or not texcoords make sense for lines
    ])
});
