import { UniformType } from '../../uniformType.enum';
import { FragmentShader } from '../fragment.shader';

export const FRAGMENT_TEXTURE = new FragmentShader({
    name: 'fragment_texture_2d',
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
            type: UniformType.NUMBER
        }
    ]
});
