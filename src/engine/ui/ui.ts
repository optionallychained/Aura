import { EntityManager } from '../entity';
import { WebGLRenderer } from '../screen';
import { UIConfig } from './ui.config';

// TODO placeholder
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
