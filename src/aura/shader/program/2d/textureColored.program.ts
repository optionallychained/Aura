import { FRAGMENT_TEXTURE_COLORED } from '../../fragment/generic/textureColored.fragment';
import { VERTEX_TEXTURE } from '../../vertex/2d/texture.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 2D Shader Program, pairing the built-in 2D VERTEX_TEXTURE and FRAGMENT_TEXTURE_COLORED
 */
export const PROGRAM_TEXTURE_COLORED = new ShaderProgram({
    name: 'program_texture_colored',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE_COLORED
});
