import { EntityManager, } from '../entity';
import { Color, Vec2, Vec3 } from '../math';
import { UIConfig } from './ui.config';

/**
 * Core UI class; providing utility and management for Entities representing UI elements
 *
 * // TODO continue on branch ui
 */
export abstract class UI extends EntityManager<UIConfig> {

    constructor(config: UIConfig) {
        super({
            name: 'ui',
            ...config
        });
    }

    public abstract addPanel(position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
