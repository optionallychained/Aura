import { UniformType } from '../../uniformType.enum';
import { VertexShader } from '../../vertex';

export const VERTEX_BASIC = new VertexShader({
    name: 'vertex_basic_3d',
    source: `
        precision mediump float;

        uniform mat4 u_Transform3D;

        attribute vec3 a_Position;

        void main() {
            gl_Position = u_Transform3D * vec4(a_Position, 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 3
        }
    ],
    uniforms: [
        {
            name: 'u_Transform3D',
            type: UniformType.MAT4
        }
    ]
});
