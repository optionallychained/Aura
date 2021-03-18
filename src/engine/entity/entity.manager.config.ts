import { Game } from '../core';
import { TextureAtlas } from '../texture';

/**
 * Interface desciribing an EntityManager configuration object
 */
export interface EntityManagerConfig {
    /** The Game the EntityManager belongs to */
    readonly game: Game;
    /** An optional TextureAtlas to use in rendering managed Entities with Texture Components */
    readonly textureAtlas?: TextureAtlas;
}
