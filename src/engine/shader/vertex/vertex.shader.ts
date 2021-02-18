import { UniformType } from '../uniformType.enum';
import { VertexShaderConfig } from './vertex.shader.config';

export class VertexShader {

    constructor(private readonly config: VertexShaderConfig) { }

    public get name(): string {
        return this.config.name;
    }

    public get source(): string {
        return this.config.source;
    }

    public get attributes(): Array<{ name: string; size: number; }> {
        return this.config.attributes;
    }

    public get uniforms(): Array<{ name: string; type: UniformType; }> {
        return this.config.uniforms;
    }
}
