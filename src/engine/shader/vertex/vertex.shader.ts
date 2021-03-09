import { AttributeArray } from '../attributeArray.type';
import { UniformArray } from '../uniformArray.type';
import { VertexShaderConfig } from './vertex.shader.config';

/**
 * Class representing a VertexShader
 *
 * Stores and provides access to all the information the WebGLRenderer, EntityshaderMap and EntityManager need to render an Entity with a
 *   given shader
 *
 * Used in constructing ShaderPrograms for registration on the game/renderer and use in Entity Shader components
 *
 * @see ShaderProgram
 */
export class VertexShader {

    // public readonly renderUniforms: UniformArray;
    // public readonly entityUniforms: UniformArray;

    /**
     * Constructor. Take and store the VertexShader's config
     *
     * @param config the VertexShader's config
     */
    constructor(private readonly config: VertexShaderConfig) {
        // this.renderUniforms = config.uniforms.filter((u) => u.variation === 'render');
        // this.entityUniforms = config.uniforms.filter((u) => u.variation === 'entity');
    }

    /**
     * Getter for the VertexShader's name, as provided in its config
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Getter for the VertexShader's source, as provided in its config
     */
    public get source(): string {
        return this.config.source;
    }

    /**
     * Getter for the VertexShader's AttributeArray specification, as provided in its config
     */
    public get attributes(): AttributeArray {
        return this.config.attributes;
    }

    public get uniforms(): UniformArray {
        return this.config.uniforms;
    }
}
