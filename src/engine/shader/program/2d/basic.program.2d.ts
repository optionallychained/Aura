import { FRAGMENT_BASIC } from '../../fragment/2d';
import { ShaderProgram } from '../../program';
import { VERTEX_BASIC } from '../../vertex/2d';


/**
 * Built-in basic ShaderProgram, pairing the built-in basic Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic_2d',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
