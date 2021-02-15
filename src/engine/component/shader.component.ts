import { ShaderProgram } from '../shader';
import { FragmentShader } from '../shader/fragment.shader';
import { VertexShader } from '../shader/vertex.shader';
import { Component } from './component';

export class Shader extends Component implements ShaderProgram {

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
