import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

/**
 * Built-in 2D Wireframe Rect Geometry, setting out the information required to render wireframe quads
 */
export class Rect extends Geometry {

    /**
     * Constructor. Provide a GeometryConfig representing a wireframe quad to the parent class
     */
    constructor() {
        super({
            name: 'rect_wireframe',
            vertices: Float32Array.from([
                0.5, 0.5,
                -0.5, 0.5,
                -0.5, -0.5,
                0.5, -0.5
            ]),
            vertexSize: 2,
            vertexCount: 4,
            glShape: GLShape.LINE_LOOP
        });
    }
}
