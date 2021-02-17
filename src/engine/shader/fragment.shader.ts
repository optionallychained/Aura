import { UniformType } from './uniformType';

export interface FragmentShader {
    name: string;

    source: string;

    uniforms: Array<{
        name: string;
        type: UniformType;
    }>;
}
