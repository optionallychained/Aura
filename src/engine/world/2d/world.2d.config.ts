import { Camera2DConfig } from '../../camera/2d';
import { EntityManagerConfig } from '../../entity';
import { Vec2 } from '../../math';

/**
 * Interface describing a World2D Configuration object
 */
export interface World2DConfig extends EntityManagerConfig {
    /** 2D world dimensions */
    dimensions: Vec2;
    camera?: Partial<Omit<Camera2DConfig, 'name'>>;
}
