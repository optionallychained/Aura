
import { FragmentShader } from '../shader/fragment/fragment.shader';
import { ShaderProgram } from '../shader/program';
import { VertexShader } from '../shader/vertex/vertex.shader';
import { Component } from './component';

export class Shader extends Component {

    public programName: string;
    public vertex: VertexShader;
    public fragment: FragmentShader;

    constructor(program: ShaderProgram) {
        super('Shader');

        this.programName = program.name;
        this.vertex = program.vertex;
        this.fragment = program.fragment;
    }
}
