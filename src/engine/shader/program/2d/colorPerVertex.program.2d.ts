import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/2d';
import { ShaderProgram } from '../../program';
import { VERTEX_COLOR_PER_VERTEX } from '../../vertex/2d';

/**
 * Built-in basic 2D color per vertex ShaderProgram, pairing the built-in basic 2D color per vertex Vertex and Fragment shaders
 *
 * @see VERTEX_COLOR_PER_VERTEX
 * @see FRAGMENT_COLOR_PER_VERTEX
 */
export const PROGRAM_COLOR_PER_VERTEX = new ShaderProgram({
    name: 'program_color_per_vertex_2d',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
