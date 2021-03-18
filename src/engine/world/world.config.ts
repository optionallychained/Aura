import { EntityManagerConfig } from '../entity';
import { Vec2, Vec3 } from '../math';

export interface WorldConfig extends EntityManagerConfig {
    dimensions: Vec3;
    camera?: {
        position?: Vec3;
        angle?: Vec3;
        zoom?: Vec2;
    }
}
