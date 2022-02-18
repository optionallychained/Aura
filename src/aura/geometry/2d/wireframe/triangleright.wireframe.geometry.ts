import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D wireframe right angle triangle Geometry
 */
export const TRIANGLE_RIGHT_ANGLE_WIREFRAME = new Geometry({
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

    ])
});
