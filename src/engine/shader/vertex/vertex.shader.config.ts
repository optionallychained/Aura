import { AttributeArray } from '../attributeArray.type';
import { UniformArray } from '../uniformArray.type';

export interface VertexShaderConfig {
    readonly name: string,
    readonly source: string,
    readonly attributes: AttributeArray,
    readonly uniforms: UniformArray
}
