import { FragmentShader } from '../fragment/fragment.shader';
import { VertexShader } from '../vertex/vertex.shader';
import { ShaderProgramConfig } from './shaderProgram.config';

export class ShaderProgram {

    constructor(private readonly config: ShaderProgramConfig) { }

    public get name(): string {
        return this.config.name;
    }

    public get vertex(): VertexShader {
        return this.config.vertex;
    }

    public get fragment(): FragmentShader {
        return this.config.fragment;
    }
}
