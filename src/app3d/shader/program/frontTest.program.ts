import { Shader } from '../../../engine';
import { FRAGMENT_FRONT_TEST } from '../fragment/frontTest.fragment';

export const PROGRAM_FRONT_TEST = new Shader.Program.ShaderProgram({
    name: 'program_front_test',
    vertex: Shader.Vertex.ThreeD.VERTEX_BASIC_3D,
    fragment: FRAGMENT_FRONT_TEST
});
