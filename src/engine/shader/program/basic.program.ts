import { FRAGMENT_BASIC } from '../fragment';
import { ShaderProgram } from './shaderProgram';
import { VERTEX_BASIC } from '../vertex';

/**
 * Built-in basic ShaderProgram, pairing the built-in basic Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
