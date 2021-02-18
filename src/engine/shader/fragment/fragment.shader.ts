import { FragmentShaderConfig } from './fragment.shader.config';
import { UniformType } from '../uniformType';

export class FragmentShader {

    constructor(private readonly config: FragmentShaderConfig) { }

    public get name(): string {
        return this.config.name;
    }

    public get source(): string {
        return this.config.source;
    }

    public get uniforms(): Array<{ name: string; type: UniformType; }> {
        return this.config.uniforms;
    }
}
