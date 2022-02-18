import { EntityManagerConfig } from '../../entity/entity.manager.config';

/**
 * Interface describing a 3D Text Configuration object
 */
export interface TextConfig extends Required<EntityManagerConfig> {
    /** The charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
