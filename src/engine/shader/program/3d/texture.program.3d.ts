import { FRAGMENT_TEXTURE } from '../../fragment/3d';
import { VERTEX_TEXTURE } from '../../vertex/3d';
import { ShaderProgram } from '../shaderProgram';

/**
 * Built-in basic 3D ShaderProgram, pairing the built-in basic 2D texture Vertex and Fragment shaders
 *
 * @see VERTEX_TEXTURE
 * @see FRAGMENT_TEXTURE
 */
export const PROGRAM_TEXTURE = new ShaderProgram({
    name: 'program_texture_3d',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE
});
