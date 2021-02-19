import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Triangle Geometry, setting out the information required to render wireframe triangles
 */
export class Triangle extends Geometry {

    /**
     * Constructor. Provide a GeometryConfig representing a wireframe triangle to the parent class
     */
    constructor() {
        super({
            name: 'triangle_wireframe',
            vertices: Float32Array.from([
                0, 0.5,
                -0.5, 0,
                0.5, 0
            ]),
            vertexSize: 2,
            vertexCount: 3,
            glShape: GLShape.LINE_LOOP
        });
    }
}
