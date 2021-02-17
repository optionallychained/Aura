import { UniformType } from '../../../engine/shader/uniformType';
import { VertexShader } from '../../../engine/shader/vertex.shader';

export const VERTEX_COLOR_PER_VERTEX: VertexShader = {
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
};
