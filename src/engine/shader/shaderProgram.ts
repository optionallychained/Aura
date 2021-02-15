import { FragmentShader } from './fragment.shader';
import { VertexShader } from './vertex.shader';

export interface ShaderProgram {
    name: string;
    vertex: VertexShader;
    fragment: FragmentShader;
}
