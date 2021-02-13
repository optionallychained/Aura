import { GLShape } from '../geometry';

export interface WebGLRendererConfig {
    VBOName: string;
    shaderProgramName: string;

    vertices: Float32Array;

    glShape: GLShape;

    attributes: { [key: string]: number };

    uniforms: {
        [key: string]: {
            type: 'mat3' | 'vec4', // TODO
            value: Float32Array
        }
    };

    vertSize: number;
    vertCount: number;
}
