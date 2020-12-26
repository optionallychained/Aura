import { EntityComponent } from '@protogl/entity/component/entityComponent';
import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { CanvasRenderer } from '@protogl/screen/canvasRenderer';

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

    public update(frameDelta: number): void {
        if (this.addList.length) {
            this.loadEntities();
        }
        if (this.removeList.length) {
            this.cleanEntities();
        }

        for (const e of this.entities) {
            e.update(frameDelta);
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

    // TODO memoization of commonly-used lists
    private filterEntitiesByComponent(component: string | EntityComponent): Entity[] {
        return this.entities.filter((e) => e.hasComponent(component));
    }

    private filterEntitiesByComponents(components: Array<string | EntityComponent>): Entity[] {
        return this.entities.filter((e) => e.hasComponents(components));
    }
}
