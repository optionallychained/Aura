import { EntityManager } from '../entity';
import { WebGLRenderer } from '../renderer';
import { WorldConfig } from './world.config';

/**
 * Core World class; providing utility and management for Entities representing game objects
 *
 * // TODO this is where perspective/ortho/camera stuff will go
 *
 * // TODO continue on branch world
 * // TODO this, Font and UI might want to actually extend from EntityManager?
 */
export class World {

    public readonly entityManager: EntityManager;

    constructor(renderer: WebGLRenderer, config: WorldConfig) {
        this.entityManager = new EntityManager({
            name: 'world',
            renderer,
            textureAtlas: config.textureAtlas
        });
    }

    public tick(frameDelta: number): void {
        this.entityManager.tick(frameDelta);
    }

    public render(): void {
        this.entityManager.render();
    }
}
