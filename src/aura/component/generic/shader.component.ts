import { FragmentShader } from '../../shader/fragment/fragment.shader';
import { ShaderProgram } from '../../shader/program/shaderProgram';
import { VertexShader } from '../../shader/vertex/vertex.shader';
import { Component } from '../component';

/**
 * Shader Component, defining the Shader an Entity will use
 *
 * Together with the Model Component, makes an Entity renderable
 */
export class Shader extends Component {

    /**
     * Constructor. Take the ShaderProgram to use and provide the name 'Shader' to the parent class
     *
     * @param program the ShaderProgram to use
     */
    constructor(private readonly program: ShaderProgram) {
        super('Shader');
    }

    /**
     * Retriever the ShaderProgram's name
     */
    public get programName(): string {
        return this.program.name;
    }

    /**
     * Retrieve the ShaderProgram's VertexShader
     */
    public get vertex(): VertexShader {
        return this.program.vertex;
    }

    /**
     * Retrieve the ShaderProgram's FragmentShader
     */
    public get fragment(): FragmentShader {
        return this.program.fragment;
    }
}
