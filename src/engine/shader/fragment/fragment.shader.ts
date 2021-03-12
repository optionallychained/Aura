import { FragmentShaderConfig } from './fragment.shader.config';
import { UniformArray } from '../uniformArray.type';

/**
 * Class representing a FragmentShader
 *
 * Stores and provides access to all the information the WebGLRenderer, EntityshaderMap and EntityManager need to render an Entity with a
 *   given shader
 *
 * Used in constructing ShaderPrograms for registration on the game/renderer and use in Entity Shader components
 *
 * @see ShaderProgram
 * @see UniformArray
 */
export class FragmentShader {

    /**
     * Constructor. Take and store the FragmentShader's config
     *
     * @param config the FragmentShader's configuration
     */
    constructor(private readonly config: FragmentShaderConfig) { }

    /**
     * Getter for the FragmentShader's name, as provided in its config
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Getter for the FragmentShader's source, as provided in its config
     */
    public get source(): string {
        return this.config.source;
    }

    public get uniforms(): UniformArray {
        return this.config.uniforms;
    }
}
