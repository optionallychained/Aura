import { FRAGMENT_TEXTURE_COLORED } from '../../fragment/2d/textureColored.fragment.2d';
import { VERTEX_TEXTURE } from '../../vertex/2d/texture.vertex.2d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 2D ShaderProgram, pairing the built-in basic 2D texture Vertex and Fragment shaders
 *
 * @see VERTEX_TEXTURE
 * @see FRAGMENT_TEXTURE_COLORED
 */
export const PROGRAM_TEXTURE_COLORED = new ShaderProgram({
    name: 'program_texture_colored_2d',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE_COLORED
});
