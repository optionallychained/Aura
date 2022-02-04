import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Triangle Geometry, setting out the information required to render wireframe equilateral triangles
 */

const h = Math.sqrt(3) / 4;

export const TRIANGLE = new Geometry({
    name: 'triangle_equilateral_2d_wireframe',
    vertices: Float32Array.from([
        -0.5, -h,
        0.5, -h,
        0, h
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([
        // TODO
    ])
});
