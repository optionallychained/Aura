import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Box Geometry, setting out the information required to render wireframe quads
 */
export const BOX = new Geometry({
    name: 'box_wireframe',
    vertices: Float32Array.from([
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5
    ]),
    vertexSize: 2,
    vertexCount: 4,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([
        // TODO consider whether or not texcoords make sense for lines
    ])
});
