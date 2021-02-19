import { UniformType } from '../uniformType.enum';
import { VertexShader } from './vertex.shader';

/**
 * Built-in basic Vertex Shader, transforming vertices by a uniform Mat3 and setting a varying VertexColor
 */
export const VERTEX_COLOR_PER_VERTEX = new VertexShader({
    name: 'vertex_color_per_vertex',
    source: `
        precision mediump float;

        uniform mat3 u_Transform;

        attribute vec2 a_Position;
        attribute vec4 a_VertexColor;

        varying vec4 v_Color;

        void main() {
            v_Color = a_VertexColor;

            gl_Position = vec4(u_Transform * vec3(a_Position, 1.0), 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 2
        },
        {
            name: 'a_VertexColor',
            size: 4
        }
    ],
    uniforms: [
        {
            name: 'u_Transform',
            type: UniformType.MAT3
        }
    ]
});
