import { ShaderProgram } from '../../program';
import { FRAGMENT_COLOR_PER_VERTEX } from '../fragment';
import { VERTEX_COLOR_PER_VERTEX } from '../vertex';

export const PROGRAM_COLOR_PER_VERTEX = new ShaderProgram({
    name: 'color_per_vertex',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
