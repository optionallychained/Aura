import { AttributeArray } from '../attributeArray.type';
import { UniformArray } from '../uniformArray.type';
import { VertexShaderConfig } from './vertex.shader.config';

/**
 * Class representing a VertexShader
 *
 * Provides access to all the information Aura needs to render an Entity with a given vertex shader
 *
 * Used in constructing ShaderPrograms for registration on the Game and for use in Entity Shader components
 */
export class VertexShader {

    /**
     * Constructor. Take a VertexShaderConfig
     *
     * @param config the VertexShaderConfig
     */
    constructor(private readonly config: VertexShaderConfig) { }

    /**
     * Retrieve the VertexShader's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Retrieve the VertexShader's source
     */
    public get source(): string {
        return this.config.source;
    }

    /**
     * Getter for the VertexShader's attribute specifications
     */
    public get attributes(): AttributeArray {
        return this.config.attributes;
    }

    /**
     * Retrieve the VertexShader's uniform specifications
     */
    public get uniforms(): UniformArray {
        return this.config.uniforms;
    }
}
