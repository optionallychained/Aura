import { EntityManagerConfig } from '../entity';
import { Vec2, Vec3 } from '../math';

/**
 * Interface describing a World2D Configuration object
 */
export interface WorldConfig2D extends EntityManagerConfig {
    /** 2D world dimensions */
    dimensions: Vec2;
    /** 2D Camera offsets */
    cameraOffsets?: {
        position?: Vec2;
        angle?: number;
    };
}

/**
 * Interface describing a World3D Configuration object
 */
export interface WorldConfig3D extends EntityManagerConfig {
    /** 3D world dimensions */
    dimensions: Vec3;
    /** 3D Camera offsets */
    cameraOffsets?: {
        position?: Vec3;
        angles?: Vec3;
    };
}
