import { UniformType } from './uniformType';

export interface VertexShader {
    name: string;
    source: string;
    attributes: { [key: string]: number };
    uniforms: { [key: string]: UniformType };
}
