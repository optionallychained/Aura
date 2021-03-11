import { EntityManagerConfig } from '../entity';
import { Vec2 } from '../math';

export interface WorldConfig extends EntityManagerConfig {
    dimensions: Vec2;
}
