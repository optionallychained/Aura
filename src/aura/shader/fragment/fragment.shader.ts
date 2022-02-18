import { FragmentShaderConfig } from './fragment.shader.config';
import { UniformArray } from '../uniformArray.type';

/**
 * Class representing a FragmentShader
 *
 * Provides access to all the information Aura needs to render an Entity with a given fragment shader
 *
 * Used in constructing ShaderPrograms for registration on the Game and for use in Entity Shader components
 */
export class FragmentShader {

    /**
     * Constructor. Take a FragmentShaderConfig
     *
     * @param config the FragmentShaderConfig
     */
    constructor(private readonly config: FragmentShaderConfig) { }

    /**
     * Retrieve the FragmentShader's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Retrieve the FragmentShader's source
     */
    public get source(): string {
        return this.config.source;
    }

    /**
     * Retrieve the FragmentShader's uniform specifications
     */
    public get uniforms(): UniformArray {
        return this.config.uniforms;
    }
}
