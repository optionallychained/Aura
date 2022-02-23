import { FRAGMENT_BASIC } from '../../fragment/generic/basic.fragment';
import { VERTEX_BASIC } from '../../vertex/2d/basic.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 2D Shader Program, pairing the built-in 2D VERTEX_BASIC and FRAGMENT_BASIC shaders
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
