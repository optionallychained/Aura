import { Vec2 } from '../../../math';
import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';


export class Rect implements Geometry {
    public vertices = [
        new Vec2(0.5, 0.5),
        new Vec2(0, 0.5),
        new Vec2(0, 0),
        new Vec2(0.5, 0)
    ];

    public glShape = GLShape.LINE_LOOP;

    public vertexSize = 2;
    public vertexCount = this.vertices.length;

    public name = 'rect_wireframe';
}
