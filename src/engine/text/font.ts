import { EntityManager } from '../entity';
import { Color, Vec2, Vec3 } from '../math';
import { FontConfig } from './font.config';

/**
 * Core Font class; providing utility and management for Entities representing strings and characters
 *
 * // TODO continue on branch text
 */
export abstract class Font extends EntityManager<FontConfig> {

    constructor(config: FontConfig) {
        super({
            name: 'font',
            ...config
        });
    }

    public abstract addString(text: string, position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
