import { EntityManager } from '../entity';
import { Vec2 } from '../math';
import { WebGLRenderer } from '../screen';

export class World {

    public readonly entityManager: EntityManager;

    constructor(private readonly renderer: WebGLRenderer, private readonly dimensions: Vec2, textureAtlasPath?: string) {
        this.entityManager = new EntityManager({
            renderer,
            name: 'world',
            textureAtlasPath
        });
    }

    public tick(frameDelta: number): void {
        this.entityManager.tick(frameDelta);
    }

    public render(): void {
        this.entityManager.render();
    }
}
