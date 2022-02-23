import { UniformArray } from '../uniformArray.type';

/**
 * Interface describing a FragmentShader configuration object
 */
export interface FragmentShaderConfig {
    /** A name for the FragmentShader */
    readonly name: string;
    /** The FragmentShader's source */
    readonly source: string;
    /** A UniformArray describing the uniforms the FragmentShader contains */
    readonly uniforms: UniformArray;
}
