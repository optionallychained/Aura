import { FragmentShader } from '..';
import { UniformType } from '../../uniformType.enum';

/**
 * Built-in basic 2D Fragment Shader, shading fragments with a uniform color
 *
 * // TODO fragment shaders at this level of complexity vary less between 2D and 3D than vertex shaders
 * //   is it worth having the split at all?
 */
export const FRAGMENT_BASIC = new FragmentShader({
    name: 'fragment_basic',
    source: `
        precision mediump float;

        uniform vec4 u_Color;

        void main() {
            gl_FragColor = u_Color;
        }
    `,
    uniforms: [
        {
            name: 'u_Color',
            type: UniformType.VEC4,
            variation: 'entity'
        }
    ]
});
