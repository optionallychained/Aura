import { FRAGMENT_BASIC } from '../../fragment/3d';
import { ShaderProgram } from '../../program';
import { VERTEX_BASIC } from '../../vertex/3d';

/**
 * Built-in basic 3D ShaderProgram, pairing the built-in basic 3D Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic_3d',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
