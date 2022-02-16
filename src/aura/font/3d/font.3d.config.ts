import { EntityManagerConfig } from '../../entity/entity.manager.config';

/**
 * Interface desciribing the Font3D configuration object, specifying 3d-relevant Font configruation
 */
export interface Font3DConfig extends Required<EntityManagerConfig> {
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
