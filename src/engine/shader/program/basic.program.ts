import { FRAGMENT_BASIC } from '../fragment';
import { ShaderProgram } from './shaderProgram';
import { VERTEX_BASIC } from '../vertex';

export const PROGRAM_BASIC = new ShaderProgram({
    name: 'basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
