import { EntityManager } from '../entity';
import { WebGLRenderer } from '../renderer';
import { UIConfig } from './ui.config';

/**
 * Core UI class; providing utility and management for Entities representing UI elements
 *
 * // TODO continue on branch ui
 * // TODO this, World and Font might want to actually extend from EntityManager?
 */
export class UI {

    private readonly entityManager: EntityManager;

    constructor(private readonly renderer: WebGLRenderer, private readonly config?: UIConfig) {
        this.entityManager = new EntityManager({
            name: 'ui',
            renderer,
            textureAtlas: config?.textureAtlas
        });
    }

    public tick(frameDelta: number): void {
        this.entityManager.tick(frameDelta);
    }

    public render(): void {
        this.entityManager.render();
    }
}
