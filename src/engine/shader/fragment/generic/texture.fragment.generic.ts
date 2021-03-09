import { UniformType } from '../../uniformType.enum';
import { FragmentShader } from '../fragment.shader';

/**
 * Built-in basic 2D Fragment Shader, supporting texture sampling with texcoords
 */
export const FRAGMENT_TEXTURE = new FragmentShader({
    name: 'fragment_texture',
    source: `
        precision mediump float;

        uniform sampler2D u_Texture;

        varying vec2 v_TexCoord;

        void main() {
            gl_FragColor = texture2D(u_Texture, v_TexCoord);
        }
    `,
    uniforms: [
        {
            name: 'u_Texture',
            type: UniformType.INTEGER,
            variation: 'render'
        }
    ]
});
