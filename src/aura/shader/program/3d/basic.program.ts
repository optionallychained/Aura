import { FRAGMENT_BASIC } from '../../fragment/generic/basic.fragment';
import { VERTEX_BASIC } from '../../vertex/3d/basic.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 3D Shader Program, pairing the built-in 3D VERTEX_BASIC and FRAGMENT_BASIC shaders
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
