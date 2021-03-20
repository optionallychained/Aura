import { EntityManagerConfig } from '../entity';
import { Vec3 } from '../math';

export interface WorldConfig extends EntityManagerConfig {
    dimensions: Vec3;
    cameraOffsets?: {
        position?: Vec3;
        angles?: Vec3;
    }
}
