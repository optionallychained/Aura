import { Entity } from '../entity';
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
    /** The list of Entities this draw call is rendering; used in uploading uniform values, if applicable */
    entities: Array<Entity>;
}
