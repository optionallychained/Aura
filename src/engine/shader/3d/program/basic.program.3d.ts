import { ShaderProgram } from '../../program';
import { FRAGMENT_BASIC } from '../fragment';
import { VERTEX_BASIC } from '../vertex';

export const PROGRAM_BASIC = new ShaderProgram({
    name: 'program_basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
