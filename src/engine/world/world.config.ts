import { EntityManagerConfig } from '../entity';
import { Vec2, Vec3 } from '../math';

export interface WorldConfig2D extends EntityManagerConfig {
    dimensions: Vec2;
    cameraOffsets?: {
        position?: Vec2;
        angle?: number;
    };
}

export interface WorldConfig3D extends EntityManagerConfig {
    dimensions: Vec3;
    cameraOffsets?: {
        position?: Vec3;
        angles?: Vec3;
    };
}
