import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Triangle Geometry, setting out the information required to render wireframe right angle triangles
 */
export const TRIANGLE_RIGHT_ANGLE = new Geometry({
    name: 'triangle_right_angle_wireframe',
    vertices: Float32Array.from([
        -0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([
        // TODO consider whether or not texcoords make sense for lines
    ])
});
