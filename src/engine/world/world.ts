import { EntityManager } from '../entity';
import { Vec2 } from '../math';
import { WebGLRenderer } from '../screen';
import { TextureAtlas } from '../texture';

export class World {

    public readonly entityManager: EntityManager;

    constructor(private readonly renderer: WebGLRenderer, private readonly dimensions: Vec2, textureAtlas?: TextureAtlas) {
        this.entityManager = new EntityManager({
            renderer,
            name: 'world',
            textureAtlas
        });
    }

    public tick(frameDelta: number): void {
        this.entityManager.tick(frameDelta);
    }

    public render(): void {
        this.entityManager.render();
    }
}
