import { FRAGMENT_COLOR_PER_VERTEX } from '../fragment';
import { VERTEX_COLOR_PER_VERTEX } from '../vertex';
import { ShaderProgram } from './shaderProgram';

/**
 * Built-in basic color per vertex ShaderProgram, pairing the built-in basic color per vertex Vertex and Fragment shaders
 *
 * @see VERTEX_COLOR_PER_VERTEX
 * @see FRAGMENT_COLOR_PER_VERTEX
 */
export const PROGRAM_COLOR_PER_VERTEX = new ShaderProgram({
    name: 'color_per_vertex',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
