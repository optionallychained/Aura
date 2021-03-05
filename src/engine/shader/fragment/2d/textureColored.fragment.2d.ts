import { UniformType } from '../../uniformType.enum';
import { FragmentShader } from '../fragment.shader';

/**
 * Built-in basic 2D Fragment Shader, supporting texture sampling with texcoords and unform color multiplication
 */
export const FRAGMENT_TEXTURE_COLORED = new FragmentShader({
    name: 'fragment_texture_2d',
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
            type: UniformType.INTEGER
        },
        {
            name: 'u_Color',
            type: UniformType.VEC4
        }
    ]
});
