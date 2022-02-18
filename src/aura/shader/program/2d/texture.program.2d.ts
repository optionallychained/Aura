import { FRAGMENT_TEXTURE } from '../../fragment/generic/texture.fragment.generic';
import { VERTEX_TEXTURE_2D } from '../../vertex/2d/texture.vertex.2d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 2D ShaderProgram, pairing the built-in basic 2D texture Vertex and Fragment shaders
 *
 * @see VERTEX_TEXTURE_2D
 * @see FRAGMENT_TEXTURE
 */
export const PROGRAM_TEXTURE_2D = new ShaderProgram({
    name: 'program_texture',
    vertex: VERTEX_TEXTURE_2D,
    fragment: FRAGMENT_TEXTURE
});
