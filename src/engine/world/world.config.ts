import { Vec2 } from '../math';
import { TextureAtlas } from '../texture';

export interface WorldConfig {
    readonly dimensions?: Vec2;
    readonly textureAtlas?: TextureAtlas;
}
