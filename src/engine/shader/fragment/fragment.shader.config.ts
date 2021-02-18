import { UniformArray } from '../uniformType';

export interface FragmentShaderConfig {
    readonly name: string;
    readonly source: string;
    readonly uniforms: UniformArray;
}
