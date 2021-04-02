import { Entity } from '../entity';
import { VBOConfig } from './vbo.config';

/**
 * Interface describing a Renderer configuration object, containing all the information the Renderer needs to execute a *single*
 *   render() call
 *
 * Constructed by the EntityManager in its management and rendering of Entities
 *
 * @see WebGLRenderer
 * @see EntityManager
 */
export interface RendererConfig {
    /** The name of the shader program to use for this render call */
    readonly shaderProgramName: string;
    /** The VBOConfig describing the VBO to use in this render call */
    readonly vbo: VBOConfig;
    /** The list of Entities this draw call is rendering; used in uploading uniform values, if applicable */
    readonly entities: ReadonlyArray<Entity>;
    /** The name of the texture atlas to use for this render call; if applicable */
    readonly textureAtlasName?: string;
}
