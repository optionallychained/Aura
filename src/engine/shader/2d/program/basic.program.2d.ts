import { ShaderProgram } from '../../program';
import { FRAGMENT_BASIC } from '../fragment/basic.fragment.2d';
import { VERTEX_BASIC } from '../vertex/basic.vertex.2d';

/**
 * Built-in basic ShaderProgram, pairing the built-in basic Vertex and Fragment shaders
 *
 * @see VERTEX_BASIC
 * @see FRAGMENT_BASIC
 */
export const PROGRAM_BASIC = new ShaderProgram({
    name: 'basic',
    vertex: VERTEX_BASIC,
    fragment: FRAGMENT_BASIC
});
