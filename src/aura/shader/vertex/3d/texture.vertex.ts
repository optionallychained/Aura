import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { VertexShader } from '../vertex.shader';

/**
 * Built-in 3D Vertex Shader, transforming vertices by a uniform Mat4 and setting a varying texCoord
 */
export const VERTEX_TEXTURE = new VertexShader({
    name: 'vertex_texture',
    source: `
        precision mediump float;

        uniform mat4 u_Transform;
        uniform mat4 u_Projection;
        uniform mat4 u_View;

        attribute vec3 a_Position;
        attribute vec2 a_TexCoord;

        varying vec2 v_TexCoord;

        void main() {
            v_TexCoord = a_TexCoord;

            gl_PointSize = 1.0;

            gl_Position = u_Projection * u_View * u_Transform * vec4(a_Position, 1.0);
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
            name: 'u_Transform',
            type: UniformType.MAT4,
            variation: UniformVariation.ENTITY
        },
        {
            name: 'u_Projection',
            type: UniformType.MAT4,
            variation: UniformVariation.STATIC
        },
        {
            name: 'u_View',
            type: UniformType.MAT4,
            variation: UniformVariation.STATIC
        }
    ]
});
