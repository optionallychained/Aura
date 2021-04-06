import { FRAGMENT_BASIC } from '../../fragment/generic';
import { VERTEX_BASIC_2D } from '../../vertex/2d';
import { ShaderProgram } from '../shaderProgram';


/**
 * Built-in basic 2D ShaderProgram, pairing the built-in basic 2D Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC_2D
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC_2D = new ShaderProgram({
    name: 'program_basic_2d',
    vertex: VERTEX_BASIC_2D,
    fragment: FRAGMENT_BASIC
});
