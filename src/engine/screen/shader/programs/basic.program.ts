import { FRAGMENT_BASIC } from '../fragment/basic.fragment';
import { ShaderProgram } from '../shaderProgram';
import { VERTEX_BASIC } from '../vertex/basic.vertex';

export const PROGRAM_BASIC: ShaderProgram = {
    name: 'basic',
    vertexSource: VERTEX_BASIC,
    fragmentSource: FRAGMENT_BASIC
};
