import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { FragmentShader } from '../fragment.shader';

/**
 * Built-in basic 2D Fragment Shader, shading fragments with a uniform color
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
            variation: UniformVariation.ENTITY
        }
    ]
});
