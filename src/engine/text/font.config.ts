import { TextureAtlas } from '../texture';

export interface FontConfig {
    readonly textureAtlas: TextureAtlas;
    readonly charset: Array<string>;
}
