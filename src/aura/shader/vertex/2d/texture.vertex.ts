import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { VertexShader } from '../vertex.shader';

/**
 * Built-in 2D Vertex Shader, transforming vertices by a uniform Mat3 and setting a varying texCoord
 */
export const VERTEX_TEXTURE = new VertexShader({
    name: 'vertex_texture',
    source: `
        precision mediump float;

        uniform mat3 u_Transform2D;
        uniform mat3 u_Projection;
        uniform mat3 u_View;

        attribute vec2 a_Position;
        attribute vec2 a_TexCoord;

        varying vec2 v_TexCoord;

        void main() {
            v_TexCoord = a_TexCoord;

            gl_PointSize = 1.0;

            gl_Position = vec4(u_Projection * u_View * u_Transform2D * vec3(a_Position, 1.0), 1.0);
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
        },
        {
            name: 'u_Projection',
            type: UniformType.MAT3,
            variation: UniformVariation.STATIC
        },
        {
            name: 'u_View',
            type: UniformType.MAT3,
            variation: UniformVariation.STATIC
        }
    ]
});
