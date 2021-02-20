import { FragmentShader } from '../../fragment';

export const FRAGMENT_COLOR_PER_VERTEX = new FragmentShader({
    name: 'fragment_color_per_vertex_3d',
    source: `
        precision mediump float;

        varying vec4 v_Color;

        void main() {
            gl_FragColor = v_Color;
        }
    `,
    uniforms: []
});
