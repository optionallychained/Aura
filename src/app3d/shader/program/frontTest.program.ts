import { ShaderProgram, VertexShaders } from '../../../aura/index.3d';
import { FRAGMENT_FRONT_TEST } from '../fragment/frontTest.fragment';

export const PROGRAM_FRONT_TEST = new ShaderProgram({
    name: 'program_front_test',
    vertex: VertexShaders.BASIC,
    fragment: FRAGMENT_FRONT_TEST
});
