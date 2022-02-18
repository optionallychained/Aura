import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { FragmentShader } from '../fragment.shader';

/**
 * Built-in 2D and 3D Fragment Shader, supporting texture sampling with texcoords and uniform color multiplication
 */
export const FRAGMENT_TEXTURE_COLORED = new FragmentShader({
    name: 'fragment_texture_colored',
    source: `
        precision mediump float;

        uniform sampler2D u_Texture;
        uniform vec4 u_Color;

        varying vec2 v_TexCoord;

        void main() {
            gl_FragColor = texture2D(u_Texture, v_TexCoord) * u_Color;
        }
    `,
    uniforms: [
        {
            name: 'u_Texture',
            type: UniformType.INTEGER,
            variation: UniformVariation.STATIC
        },
        {
            name: 'u_Color',
            type: UniformType.VEC4,
            variation: UniformVariation.ENTITY
        }
    ]
});
