import { FRAGMENT_TEXTURE } from '../../fragment/2d/texture.fragment.2d';
import { VERTEX_TEXTURE } from '../../vertex/2d/texture.vertex.2d';
import { ShaderProgram } from '../shaderProgram';

export const PROGRAM_TEXTURE = new ShaderProgram({
    name: 'program_texture_2d',
    vertex: VERTEX_TEXTURE,
    fragment: FRAGMENT_TEXTURE
});
