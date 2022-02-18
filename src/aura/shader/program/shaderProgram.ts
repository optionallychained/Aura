import { FragmentShader } from '../fragment/fragment.shader';
import { VertexShader } from '../vertex/vertex.shader';
import { ShaderProgramConfig } from './shaderProgram.config';

/**
 * Class representing a ShaderProgram, packing together a VertexShader and FragmentShader to produce a complete shader program
 *
 * Used in registering shader programs on the Game and for use in Entity Shader Components
 */
export class ShaderProgram {

    /**
     * Constructor. Take a ShaderProgramConfig
     *
     * @param config the ShaderProgram's configuration object
     */
    constructor(private readonly config: ShaderProgramConfig) { }

    /**
     * Retrieve the ShaderProgram's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Retrieve the ShaderProgram's FragmentShader
     */
    public get fragment(): FragmentShader {
        return this.config.fragment;
    }

    /**
     * Retrieve the ShaderProgram's VertexShader
     */
    public get vertex(): VertexShader {
        return this.config.vertex;
    }
}
