import { UniformType } from '../../uniformType.enum';
import { VertexShader } from '../vertex.shader';

/**
 * Built-in basic 3D Vertex Shader, transforming vertices by a uniform Mat3 and setting a varying texCoord
 */
export const VERTEX_TEXTURE_3D = new VertexShader({
    name: 'vertex_texture_3d',
    source: `
        precision mediump float;

        uniform mat4 u_Transform3D;

        attribute vec3 a_Position;
        attribute vec2 a_TexCoord;

        varying vec2 v_TexCoord;

        void main() {
            v_TexCoord = a_TexCoord;

            gl_PointSize = 1.0;

            gl_Position = u_Transform3D * vec4(a_Position, 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 3
        },
        {
            name: 'a_TexCoord',
            size: 2
        }
    ],
    uniforms: [
        {
            name: 'u_Transform3D',
            type: UniformType.MAT4,
            variation: 'entity'
        }
    ]
});
