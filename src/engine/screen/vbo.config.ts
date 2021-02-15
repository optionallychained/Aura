import { GLShape } from '../geometry';

export interface VBOConfig {
    name: string;
    vertices: Float32Array,
    changed: boolean,
    glShape: GLShape,
    vertexCount: number,
    vertexSize: number
}
