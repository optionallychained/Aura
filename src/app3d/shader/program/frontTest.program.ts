import { ShaderProgram } from '../../../aura/shader/program/shaderProgram';
import { VERTEX_BASIC_3D } from '../../../aura/shader/vertex/3d/basic.vertex.3d';
import { FRAGMENT_FRONT_TEST } from '../fragment/frontTest.fragment';

export const PROGRAM_FRONT_TEST = new ShaderProgram({
    name: 'program_front_test',
    vertex: VERTEX_BASIC_3D,
    fragment: FRAGMENT_FRONT_TEST
});
