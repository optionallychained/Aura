import { UniformType } from '../uniformType.enum';
import { VertexShader } from './vertex.shader';

/**
 * Built-in basic Fragment Shader, transforming vertices by a uniform Mat3
 */
export const VERTEX_BASIC = new VertexShader({
    name: 'vertex_basic',
    source: `
        uniform mat3 u_Transform;

        attribute vec2 a_Position;

        void main() {
            gl_Position = vec4(u_Transform * vec3(a_Position, 1.0), 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 2
        }
    ],
    uniforms: [
        {
            name: 'u_Transform',
            type: UniformType.MAT3
        }
    ]
});
