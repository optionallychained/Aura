import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Rect Geometry, setting out the information required to render quads
 *
 * // TODO now that Geometry is definitely a fixed thing and not dependent on Entity Position or Scale,
 * //   can be made to be singleton instances of Geometry instead, not requiring construction for games
 */
export class Rect extends Geometry {

    /**
     * Constructor. Provide a GeometryConfig representing a quad to the parent class
     */
    constructor() {
        super({
            name: 'rect',
            vertices: Float32Array.from([
                0.5, 0.5,
                -0.5, 0.5,
                -0.5, -0.5,

                -0.5, -0.5,
                0.5, -0.5,
                0.5, 0.5
            ]),
            vertexSize: 2,
            vertexCount: 6,
            glShape: GLShape.TRIANGLES
        });
    }
}
