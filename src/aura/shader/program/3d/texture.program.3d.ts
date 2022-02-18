import { FRAGMENT_TEXTURE } from '../../fragment/generic/texture.fragment.generic';
import { VERTEX_TEXTURE_3D } from '../../vertex/3d/texture.vertex.3d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 3D ShaderProgram, pairing the built-in basic 2D texture Vertex and Fragment shaders
 *
 * @see VERTEX_TEXTURE_3D
 * @see FRAGMENT_TEXTURE
 */
export const PROGRAM_TEXTURE_3D = new ShaderProgram({
    name: 'program_texture',
    vertex: VERTEX_TEXTURE_3D,
    fragment: FRAGMENT_TEXTURE
});
