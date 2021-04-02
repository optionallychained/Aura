import { FragmentShader } from '../fragment';
import { VertexShader } from '../vertex';
import { ShaderProgramConfig } from './shaderProgram.config';

/**
 * Class representing a complete ShaderProgram
 *
 * Stores and provides access to all the information the WebGLRenderer, EntityshaderMap and EntityManager need to render an Entity with a
 *   given shader pair
 *
 * Used in registering shader programs on the game/renderer and for associating with Entities via Shader components
 *
 * @see FragmentShader
 * @see VertexShader
 */
export class ShaderProgram {

    /**
     * Constructor. Take and store the ShaderProgram's configuration object
     *
     * @param config the ShaderProgram's configuration object
     */
    constructor(private readonly config: ShaderProgramConfig) { }

    /**
     * Getter for the ShaderProgram's name, as provided in its config
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Getter for the ShaderProgram's FragementShader, as provided in its config
     */
    public get fragment(): FragmentShader {
        return this.config.fragment;
    }

    /**
     * Getter for the ShaderProgram's VertexShader, as provided in its config
     */
    public get vertex(): VertexShader {
        return this.config.vertex;
    }
}
