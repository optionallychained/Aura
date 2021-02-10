import { Vec2 } from '../math';
import { GLShape } from './glShape';

export interface Geometry {
    vertices: Array<Vec2>;
    glShape: GLShape;
}
