import { FRAGMENT_BASIC } from '../../fragment/3d';
import { ShaderProgram } from '../../program';
import { VERTEX_BASIC } from '../../vertex/3d';

export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
