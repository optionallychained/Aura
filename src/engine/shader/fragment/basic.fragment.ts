import { FragmentShader } from '../fragment.shader';
import { UniformType } from '../uniformType';

export const FRAGMENT_BASIC: FragmentShader = {
    name: 'fragment_basic',
    source: `
        precision mediump float;

        uniform vec4 u_Color;

        void main() {
            gl_FragColor = u_Color;
        }
    `,
    uniforms: {
        u_Color: UniformType.VEC4
    }
};
