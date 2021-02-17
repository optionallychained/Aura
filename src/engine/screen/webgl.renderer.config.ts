import { UniformList } from './uniformList';
import { VBOConfig } from './vbo.config';

export interface WebGLRendererConfig {
    shaderProgramName: string;
    vbo: VBOConfig;
    uniforms?: UniformList;
}
