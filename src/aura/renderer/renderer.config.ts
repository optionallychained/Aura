import { UniformType } from '../aura.core';
import { Entity } from '../entity/entity';
import { VBOConfig } from './vbo.config';

/**
 * Interface describing a Renderer configuration object, containing all the information the Renderer needs to execute a single render() call
 *
 * Produced by the EntityManager in its management and rendering of Entities
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

/**
 * Renderer-only utility type for specifying arrays of attribute location and size information
 *
 * Created on shader program creation and used in generically handling vertexAttribPointer() calls
 */
export type AttributeLocationArray = Array<{
    readonly location: number;
    readonly size: number;
}>;

/**
 * Renderer-only utility type for specifying arrays of uniform name, location and type information
 *
 * Created on shader program creation and used in generically handling glUniform*() calls
 */
export type UniformLocationArray = Array<{
    readonly name: string;
    readonly location: WebGLUniformLocation;
    readonly type: UniformType;
}>;

/**
 * Renderer-only utility interface describing a specification object for a Shader Program
 *
 * Created on shader program creation and used in generically handling shader program registration and switching
 */
export interface ShaderProgramSpec {
    /** The name of the shader program */
    readonly name: string;
    /** The WebGL handle for the shader program */
    readonly program: WebGLProgram;
    /** The attribute information associated with the shader program */
    readonly attributeLocations: AttributeLocationArray;
    /** The uniform information for all 'static' (once per render call) uniforms */
    readonly staticUniformLocations: UniformLocationArray;
    /** the uniform information for all 'entity' (once per Entity) uniforms */
    readonly entityUniformLocations: UniformLocationArray;
}

/**
 * Renderer-only utility interface describing a specification object for a Texture
 *
 * Created on texture creation and used in generically handling rendering Entities with Texture Atlases
 */
export interface TextureSpec {
    /** The name of the texture */
    name: string;
    /** The GL Unit of the texture (eg gl.TEXTURE0) */
    unit: number;
    /** the Unit index of the texture (eg. unit - gl.TEXTURE0) to upload as a uniform to a Sampler*D() */
    uniformUnit: number;
    /** The WebGLTexture */
    texture: WebGLTexture;
}
