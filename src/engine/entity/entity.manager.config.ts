import { Game } from '../core';
import { Renderer } from '../renderer';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** The Game the EntityManager belongs to */
    readonly renderer: Renderer;
    /** An optional TextureAtlas to use in rendering managed Entities with Texture Components */
    readonly textureAtlas?: TextureAtlas;
}
