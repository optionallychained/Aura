import { Shader } from '../../../engine';
import { FRAGMENT_COLOR_PER_VERTEX } from '../fragment/colorPerVertex.fragment';
import { VERTEX_COLOR_PER_VERTEX } from '../vertex/colorPerVertex.vertex';

export const PROGRAM_COLOR_PER_VERTEX = new Shader.Program.ShaderProgram({
    name: 'color_per_vertex',
    vertex: VERTEX_COLOR_PER_VERTEX,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
