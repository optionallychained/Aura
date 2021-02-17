import { FragmentShader } from '../../../engine/shader/fragment.shader';

export const FRAGMENT_COLOR_PER_VERTEX: FragmentShader = {
    name: 'fragment_color_per_vertex',
    source: `
        precision mediump float;

        varying vec4 v_Color;

        void main() {
            gl_FragColor = v_Color;
        }
    `,
    uniforms: []
};
