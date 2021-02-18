import { UniformArray } from '../uniformArray.type';

export interface FragmentShaderConfig {
    readonly name: string;
    readonly source: string;
    readonly uniforms: UniformArray;
}
