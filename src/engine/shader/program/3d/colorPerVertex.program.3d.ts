import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/generic';
import { ShaderProgram } from '../../program';
import { VERTEX_COLOR_PER_VERTEX_3D } from '../../vertex/3d';

/**
 * Built-in basic 3D color per vertex ShaderProgram, pairing the built-in basic 3D color per vertex Vertex and Fragment shaders
 *
 * @see VERTEX_COLOR_PER_VERTEX_3D
 * @see FRAGMENT_COLOR_PER_VERTEX
 */
export const PROGRAM_COLOR_PER_VERTEX_3D = new ShaderProgram({
    name: 'program_color_per_vertex_3d',
    vertex: VERTEX_COLOR_PER_VERTEX_3D,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
