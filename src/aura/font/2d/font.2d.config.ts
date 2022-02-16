import { EntityManagerConfig } from '../../entity';

/**
 * Interface desciribing the Font2D configuration object, specifying 2d-relevant Font configruation
 */
export interface Font2DConfig extends Required<EntityManagerConfig> {
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
