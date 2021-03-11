import { FRAGMENT_BASIC } from '../../fragment/generic';
import { ShaderProgram } from '../../program';
import { VERTEX_BASIC_PERSPECTIVE_3D } from '../../vertex/3d';

/**
 * Built-in basic 3D ShaderProgram, pairing the built-in basic 3D Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC_3D
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC_PERSPECTIVE_3D = new ShaderProgram({
    name: 'program_basic_perspective_3d',
    vertex: VERTEX_BASIC_PERSPECTIVE_3D,
    fragment: FRAGMENT_BASIC
});
