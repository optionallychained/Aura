import { UniformSet } from './uniformSet.type';
import { VBOConfig } from './vbo.config';

/**
 * Interface describing a WebGLRenderer configuration object, containing all the information the WebGLRenderer needs to execute a *single*
 *   render() call
 *
 * Constructed by the EntityManager in its management and rendering of Entities
 *
 * @see WebGLRenderer
 * @see EntityManager
 */
export interface WebGLRendererConfig {
    /** The name of the shader program to use for this render call */
    shaderProgramName: string;
    /** The VBOConfig describing the VBO to use in this render call */
    vbo: VBOConfig;
    /** An optional UniformSet for when shader uniforms are present, used by the Renderer to decide how many times to call drawArrays() */
    uniforms?: UniformSet;
}
