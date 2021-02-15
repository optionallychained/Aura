import { Vec2 } from '../math';
import { GLShape } from './glShape';

export interface Geometry {
    name: string;
    vertices: Array<Vec2>;
    vertSize: number;
    vertCount: number;
    glShape: GLShape;
}
