import { Vec2 } from '../../math';
import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in 2D Triangle Geometry, setting out the information required to render triangles
 */
export class Triangle extends Geometry {

    /**
     * Constructor. Provide a GeometryConfig representing a triangle to the parent class
     */
    constructor() {
        super({
            name: 'triangle',
            vertices: [
                new Vec2(0, 0.5),
                new Vec2(-0.5, 0),
                new Vec2(0.5, 0)
            ],
            vertexSize: 2,
            vertexCount: 3,
            glShape: GLShape.TRIANGLES
        });
    }
}
