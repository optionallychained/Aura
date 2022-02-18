import { FRAGMENT_TEXTURE } from '../../fragment/generic/texture.fragment';
import { VERTEX_TEXTURE } from '../../vertex/3d/texture.vertex';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in 3D Shader Program, pairing the built-in 3D VERTEX_TEXTURE and FRAGMENT_TEXTURE
 */
export const PROGRAM_TEXTURE = new ShaderProgram({
    name: 'program_texture',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE
});
