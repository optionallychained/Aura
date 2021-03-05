import { FlatColor, Model, Shader, Texture } from '../component';
import { Transform2D } from '../component/2d';
import { Entity, EntityManager } from '../entity';
import { TwoD } from '../geometry';
import { Color, Vec2 } from '../math';
import { WebGLRenderer } from '../renderer';
import { PROGRAM_TEXTURE_COLORED } from '../shader/program/2d';
import { FontConfig } from './font.config';

/**
 * Core Font class; providing utility and management for Entities representing strings and characters
 *
 * // TODO continue on branch text
 * // TODO this, World and UI might want to actually extend from EntityManager?
 */
export class Font {

    public readonly entityManager: EntityManager;

    constructor(private readonly renderer: WebGLRenderer, private readonly config: FontConfig) {
        this.entityManager = new EntityManager({
            name: 'font',
            renderer,
            textureAtlas: config.textureAtlas
        });
    }

    public addString(text: string, position: Vec2, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Entity({
                tag: 'string_char',
                components: [
                    new Transform2D(Vec2.add(position, new Vec2(i * 0.25, 0)), new Vec2(0.25, 0.25)),
                    new Shader(PROGRAM_TEXTURE_COLORED),
                    new Model(TwoD.BOX),
                    new Texture(this.config.charset.indexOf(char.toUpperCase()), 0),
                    new FlatColor(color)
                ]
            }));

            i++;
        }

        this.entityManager.addEntities(...entities);
    }

    public tick(frameDelta: number): void {
        this.entityManager.tick(frameDelta);
    }

    public render(): void {
        this.entityManager.render();
    }
}
