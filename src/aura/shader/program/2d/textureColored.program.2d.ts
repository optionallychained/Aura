import { FRAGMENT_TEXTURE_COLORED } from '../../fragment/generic/textureColored.fragment.generic';
import { VERTEX_TEXTURE_2D } from '../../vertex/2d/texture.vertex.2d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 2D ShaderProgram, pairing the built-in basic 2D texture Vertex and Fragment shaders
 *
 * @see VERTEX_TEXTURE_2D
 * @see FRAGMENT_TEXTURE_COLORED
 */
export const PROGRAM_TEXTURE_COLORED_2D = new ShaderProgram({
    name: 'program_texture_colored_2d',
    vertex: VERTEX_TEXTURE_2D,
    fragment: FRAGMENT_TEXTURE_COLORED
});
