import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Pentagon Geometry, setting out the information required to render wireframe pentagons
 *
 * Not using POLYGON() because the resultant shape is 'rotated' strangely
 */
export const PENTAGON_WIREFRAME = new Geometry({
    name: 'pentagon_wireframe',
    vertices: Float32Array.from([
        -0.3, -0.5,
        0.3, -0.5,
        0.5, 0.1,
        0, 0.5,
        -0.5, 0.1
    ]),
    vertexSize: 2,
    vertexCount: 5,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
