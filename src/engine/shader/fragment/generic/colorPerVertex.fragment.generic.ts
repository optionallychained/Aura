import { FragmentShader } from '..';

/**
 * Built-in basic 2D Fragment Shader, shading fragments with a varying Color
 *
 * // TODO fragment shaders at this level of complexity vary less between 2D and 3D than vertex shaders
 * //   is it worth having the split at all?
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
