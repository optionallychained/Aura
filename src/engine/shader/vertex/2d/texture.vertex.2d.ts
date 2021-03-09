import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { VertexShader } from '../vertex.shader';

/**
 * Built-in basic 2D Vertex Shader, transforming vertices by a uniform Mat3 and setting a varying texCoord
 */
export const VERTEX_TEXTURE_2D = new VertexShader({
    name: 'vertex_texture_2d',
    source: `
        precision mediump float;

        uniform mat3 u_Transform2D;

        attribute vec2 a_Position;
        attribute vec2 a_TexCoord;

        varying vec2 v_TexCoord;

        void main() {
            v_TexCoord = a_TexCoord;

            gl_PointSize = 1.0;

            gl_Position = vec4(u_Transform2D * vec3(a_Position, 1.0), 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 2
        },
        {
            name: 'a_TexCoord',
            size: 2
        }
    ],
    uniforms: [
        {
            name: 'u_Transform2D',
            type: UniformType.MAT3,
            variation: UniformVariation.ENTITY
        }
    ]
});
