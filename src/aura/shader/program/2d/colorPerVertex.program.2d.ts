import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/generic/colorPerVertex.fragment.generic';
import { VERTEX_COLOR_PER_VERTEX_2D } from '../../vertex/2d/colorPerVertex.vertex.2d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 2D color per vertex ShaderProgram, pairing the built-in basic 2D color per vertex Vertex and Fragment shaders
 *
 * @see VERTEX_COLOR_PER_VERTEX_2D
 * @see FRAGMENT_COLOR_PER_VERTEX
 */
export const PROGRAM_COLOR_PER_VERTEX_2D = new ShaderProgram({
    name: 'program_color_per_vertex',
    vertex: VERTEX_COLOR_PER_VERTEX_2D,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
