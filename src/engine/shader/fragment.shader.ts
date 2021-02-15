import { UniformType } from './uniformType';

export interface FragmentShader {
    name: string;
    source: string;
    uniforms: { [key: string]: UniformType };
}
