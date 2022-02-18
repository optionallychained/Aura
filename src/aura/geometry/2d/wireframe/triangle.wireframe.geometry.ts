import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D wireframe triangle Geometry
 */
const h = Math.sqrt(3) / 4;
export const TRIANGLE_WIREFRAME = new Geometry({
    name: 'triangle_equilateral_wireframe',
    vertices: Float32Array.from([
        -0.5, -h,
        0.5, -h,
        0, h
    ]),
    vertexSize: 2,
    vertexCount: 3,
    glShape: GLShape.LINE_LOOP,
    textureCoordinates: Float32Array.from([

    ])
});
