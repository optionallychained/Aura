import { FragmentShader } from '../fragment';
import { VertexShader } from '../vertex';

/**
 * Interface describing a ShaderProgram configuration object
 */
export interface ShaderProgramConfig {
    /** A name for the ShaderProgram */
    readonly name: string;
    /** The FragmentShader component of the ShaderProgram */
    readonly fragment: FragmentShader;
    /** The VertexShader component of the ShaderProgram */
    readonly vertex: VertexShader;
}
