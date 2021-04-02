import { EntityManagerConfig } from '../../entity';
import { Vec2 } from '../../math';

/**
 * Interface describing a World2D Configuration object
 */
export interface World2DConfig extends EntityManagerConfig {
    /** 2D world dimensions */
    dimensions: Vec2;
    /** 2D Camera offsets */
    cameraOffsets?: {
        position?: Vec2;
        angle?: number;
    };
}
