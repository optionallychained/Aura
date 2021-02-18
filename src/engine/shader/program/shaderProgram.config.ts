import { FragmentShader } from '../fragment/fragment.shader';
import { VertexShader } from '../vertex/vertex.shader';

export interface ShaderProgramConfig {
    readonly name: string;
    readonly vertex: VertexShader;
    readonly fragment: FragmentShader;
}
