import { Vec2 } from '../math/vec2';
import { GLShape } from './glShape';

export interface Geometry {
    vertices: Array<Vec2>;
    glShape: GLShape;
}
