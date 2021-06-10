import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Triangle Geometry, setting out the information required to render wireframe triangles
 */
export const TRIANGLE = new Geometry({
    name: 'triangle_2d_wireframe',
    vertices: Float32Array.from([
        -0.5, -0.5,
        0.5, -0.5,
        0, 0.5
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([
        // TODO janky...do we even want texturing for wireframes?
        0, 0,
        1, 0,
        0.5, 1
    ])
});