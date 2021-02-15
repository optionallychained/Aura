import { UniformType } from '../uniformType';
import { VertexShader } from '../vertex.shader';

export const VERTEX_BASIC: VertexShader = {
    name: 'vertex_basic',
    source: `
        uniform mat3 u_Transform;

        attribute vec2 a_Position;

        void main() {
            gl_Position = vec4(u_Transform * vec3(a_Position, 1.0), 1.0);
        }
    `,
    attributes: {
        a_Position: 2
    },
    uniforms: {
        u_Transform: UniformType.MAT3
    }
};
