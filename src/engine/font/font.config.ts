import { EntityManagerConfig } from '../entity';

/**
 * Interface desciribing the Font2D configuration object, specifying 2d-relevant Font configruation
 */
export interface FontConfig2D extends Required<EntityManagerConfig> {
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}

/**
 * Interface desciribing the Font3D configuration object, specifying 3d-relevant Font configruation
 */
export interface FontConfig3D extends Required<EntityManagerConfig> {
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
