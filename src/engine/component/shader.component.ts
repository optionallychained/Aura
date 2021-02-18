import { FragmentShader } from '../shader/fragment/fragment.shader';
import { ShaderProgram } from '../shader/program';
import { VertexShader } from '../shader/vertex/vertex.shader';
import { Component } from './component';

/**
 * Built-in Shader Component, defining the Shader an Entity will use in rendering
 *
 * @see ShaderProgram
 */
export class Shader extends Component {

    /** The name of the Shader Program */
    public programName: string;

    /** The VertexShader */
    public vertex: VertexShader;

    /** The FragmentShader */
    public fragment: FragmentShader;

    /**
     * Constructor. Take the ShaderProgram to use, and extract its details into the Component
     *
     * @param program the ShaderProgram to use
     */
    constructor(program: ShaderProgram) {
        super('Shader');

        this.programName = program.name;
        this.vertex = program.vertex;
        this.fragment = program.fragment;
    }
}
