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
 */
export class FragmentShader {

    public readonly renderUniforms: UniformArray;
    public readonly entityUniforms: UniformArray;

    /**
     * Constructor. Take and store the FragmentShader's config
     *
     * @param config the FragmentShader's configuration
     */
    constructor(private readonly config: FragmentShaderConfig) {
        this.renderUniforms = config.uniforms.filter((u) => u.variation === 'render');
        this.entityUniforms = config.uniforms.filter((u) => u.variation === 'entity');
    }

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
}
