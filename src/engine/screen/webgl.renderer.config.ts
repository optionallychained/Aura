import { UniformSet } from './uniformSet.type';
import { VBOConfig } from './vbo.config';

export interface WebGLRendererConfig {
    shaderProgramName: string;
    vbo: VBOConfig;
    uniforms?: UniformSet;
}
