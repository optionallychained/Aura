import { EntityManager } from '../entity';
import { WebGLRenderer } from '../renderer';
import { WorldConfig } from './world.config';

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
