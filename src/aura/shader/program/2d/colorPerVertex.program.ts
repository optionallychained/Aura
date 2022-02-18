import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/generic/colorPerVertex.fragment';
import { VERTEX_COLOR_PER_VERTEX } from '../../vertex/2d/colorPerVertex.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 2D Shader Program, pairing the built-in 2D VERTEX_COLOR_PER_VERTEX and FRAGMENT_COLOR_PER_VERTEX shaders
 */
export const PROGRAM_COLOR_PER_VERTEX = new ShaderProgram({
    name: 'program_color_per_vertex',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
