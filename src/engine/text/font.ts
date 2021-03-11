import { Entity, EntityManager } from '../entity';
import { Color, Vec2 } from '../math';
import { Char } from './char';
import { FontConfig } from './font.config';

/**
 * Core Font class; providing utility and management for Entities representing strings and characters
 *
 * // TODO continue on branch text
 * // TODO this, World and UI might want to actually extend from EntityManager?
 */
export class Font extends EntityManager<FontConfig> {


    constructor(config: FontConfig) {
        super({
            name: 'font',
            ...config
        });
    }

    public addString(text: string, position: Vec2, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char(
                Vec2.add(position, new Vec2(i * 0.25, 0)),
                new Vec2(0.25, 0.25),
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
