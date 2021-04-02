import { FragmentShader } from '../../shader/fragment/fragment.shader';
import { ShaderProgram } from '../../shader/program';
import { VertexShader } from '../../shader/vertex/vertex.shader';
import { Component } from '../component';

/**
 * Built-in Shader Component, defining the Shader an Entity will use in rendering
 *
 * @see ShaderProgram
 */
export class Shader extends Component {

    /**
     * Constructor. Take the ShaderProgram to use, and extract its details into the Component
     *
     * @param program the ShaderProgram to use
     */
    constructor(private readonly program: ShaderProgram) {
        super('Shader');
    }

    /**
     * Getter for the Shader's name, as provided in its ShaderProgram config
     */
    public get programName(): string {
        return this.program.name;
    }

    /**
     * Getter for the Shader's VertexShader, as provided in its ShaderProgram config
     */
    public get vertex(): VertexShader {
        return this.program.vertex;
    }

    /**
     * Getter for the Shader's FragmentShader, as provided in its ShaderProgram config
     */
    public get fragment(): FragmentShader {
        return this.program.fragment;
    }
}
