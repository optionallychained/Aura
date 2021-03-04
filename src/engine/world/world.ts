import { EntityManager } from '../entity';
import { WebGLRenderer } from '../screen';
import { WorldConfig } from './world.config';

export class World {

    public readonly entityManager: EntityManager;

    constructor(private readonly renderer: WebGLRenderer, config: WorldConfig) {
        this.entityManager = new EntityManager({
            renderer,
            name: 'world',
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
