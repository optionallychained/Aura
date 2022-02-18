import { AttributeArray } from '../attributeArray.type';
import { UniformArray } from '../uniformArray.type';

/**
 * Interface describing a VertexShader configuration object
 */
export interface VertexShaderConfig {
    /** A name for the VertexShader */
    readonly name: string;
    /** The VertexShader's source */
    readonly source: string;
    /** An AttributeArray describing the attributes the VertexShader contains */
    readonly attributes: AttributeArray;
    /** A UniformArray describing the uniforms the VertexShader contains */
    readonly uniforms: UniformArray;
}
