import { FRAGMENT_TEXTURE } from '../../fragment/generic/texture.fragment';
import { VERTEX_TEXTURE } from '../../vertex/2d/texture.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 2D Shader Program, pairing the built-in 2D VERTEX_TEXTURE and FRAGMENT_TEXTURE shaders
 */
export const PROGRAM_TEXTURE = new ShaderProgram({
    name: 'program_texture',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE
});
