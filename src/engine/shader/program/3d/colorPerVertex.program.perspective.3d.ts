import { FRAGMENT_COLOR_PER_VERTEX } from '../../fragment/generic';
import { VERTEX_COLOR_PER_VERTEX_PERSPECTIVE_3D } from '../../vertex/3d';
import { ShaderProgram } from '../shaderProgram';

export const PROGRAM_COLOR_PER_VERTEX_PERSPECTIVE_3D = new ShaderProgram({
    name: 'program_color_per_vertex_perspective_3d',
    vertex: VERTEX_COLOR_PER_VERTEX_PERSPECTIVE_3D,
    fragment: FRAGMENT_COLOR_PER_VERTEX
});
