import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/3d';
import { ShaderProgram } from '../../program';
import { VERTEX_COLOR_PER_VERTEX } from '../../vertex/3d';

export const PROGRAM_COLOR_PER_VERTEX = new ShaderProgram({
    name: 'program_color_per_vertex_3d',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
