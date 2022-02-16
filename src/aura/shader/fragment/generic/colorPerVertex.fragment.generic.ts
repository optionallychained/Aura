import { FragmentShader } from '../fragment.shader';

/**
 * Built-in basic 2D Fragment Shader, shading fragments with a varying Color
 */
export const FRAGMENT_COLOR_PER_VERTEX = new FragmentShader({
    name: 'fragment_color_per_vertex',
    source: `
        precision mediump float;

        varying vec4 v_Color;

        void main() {
            gl_FragColor = v_Color;
        }
    `,
    uniforms: []
});
