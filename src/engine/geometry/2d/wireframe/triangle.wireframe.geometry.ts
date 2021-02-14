import { Vec2 } from '../../../math';
import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape';

export class Triangle implements Geometry {
    public vertices = [
        new Vec2(0, 0),
        new Vec2(0.5, 0),
        new Vec2(0.5, 0.5)
    ];

    public glShape = GLShape.LINE_LOOP;

    public vertSize = 2;
    public vertCount = this.vertices.length;
}