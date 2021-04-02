import { EntityManagerConfig } from '../../entity';
import { Vec3 } from '../../math';

/**
 * Interface describing a World3D Configuration object
 */
export interface World3DConfig extends EntityManagerConfig {
    /** 3D world dimensions */
    dimensions: Vec3;
    /** 3D Camera offsets */
    cameraOffsets?: {
        position?: Vec3;
        angles?: Vec3;
    };
}
