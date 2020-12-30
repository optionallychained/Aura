import { CanvasRenderer } from '../screen/canvasRenderer';
import { FlatColor } from './component/flatColor';
import { Transform } from './component/transform';
import { Entity } from './entity';

export class EntityManager {

    // TODO memoization of filtered commonly-used lists (renderable, for example)
    // TODO grouping of entities by component on add/remove
    private entities: Entity[] = [];
    private removeList: Entity[] = [];
    private addList: Entity[] = [];

    constructor(private renderer: CanvasRenderer) { }

    public addEntity(e: Entity): void {
        this.addList.push(e);
    }

    public addEntities(list: Entity[]): void {
        this.addList = this.addList.concat(list);
    }

    public removeEntity(e: Entity): void {
        this.removeList.push(e);
    }

    public removeEntities(list: Entity[]): void {
        this.removeList = this.removeList.concat(list);
    }

    public clearEntities(): void {
        this.removeEntities(this.entities);
    }

    public tick(frameDelta: number): void {
        if (this.addList.length) {
            this.loadEntities();
        }
        if (this.removeList.length) {
            this.cleanEntities();
        }

        for (const e of this.entities) {
            e.tick(frameDelta);
        }
    }

    public render(): void {
        const renderables = this.filterEntitiesByComponents(['FlatColor', 'Transform']);

        for (const e of renderables) {
            const transform = e.getComponentByName('Transform') as Transform; // TODO entity component type checking
            const flatColor = e.getComponentByName('FlatColor') as FlatColor;

            this.renderer.renderRect(transform.position, transform.dimensions, flatColor.color);
        }
    }

    // TODO memoization of commonly-used lists
    public filterEntitiesByComponent(component: string): Entity[] {
        return this.entities.filter((e) => e.hasComponent(component));
    }

    public filterEntitiesByComponents(components: string[]): Entity[] {
        return this.entities.filter((e) => e.hasComponents(components));
    }

    public filterEntitiesByTag(tag: string): Entity[] {
        return this.entities.filter((e) => e.getTag() === tag);
    }

    public countEntities(): number {
        return this.entities.length;
    }

    private loadEntities(): void {
        this.entities = this.entities.concat(this.addList);
        this.addList = [];
    }

    private cleanEntities(): void {
        for (const remove of this.removeList) {
            this.entities.splice(this.entities.indexOf(remove), 1);
        }
        this.removeList = [];
    }
}
