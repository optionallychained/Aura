import { EntityManagerConfig } from '../entity';
import { Vec2 } from '../math';

export interface WorldConfig extends Omit<EntityManagerConfig, 'name'> {
    dimensions: Vec2;
}
