import { FragmentShader } from '../../../aura/shader/fragment/fragment.shader';

export const FRAGMENT_FRONT_TEST = new FragmentShader({
    name: 'fragment_front_test',
    source: `
        precision mediump float;

        void main() {
            if (gl_FrontFacing) {
                gl_FragColor = vec4(0, 1, 0, 1);
            }
            else {
                gl_FragColor = vec4(1, 0, 0, 1);
            }
        }
    `,
    uniforms: []
});
