import { AttributeArray, UniformArray } from '../uniformType';

export interface VertexShaderConfig {
    readonly name: string,
    readonly source: string,
    readonly attributes: AttributeArray,
    readonly uniforms: UniformArray
}
