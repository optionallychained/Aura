import { GLShape } from '../geometry';

export interface WebGLRendererConfig {
    VBOName: string;
    shaderProgramName: string;

    vertices: Float32Array;

    glShape: GLShape;

    attributes: { [key: string]: number };

    vertSize: number;
    vertCount: number;
}
