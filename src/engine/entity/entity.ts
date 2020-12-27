import { EntityComponent } from './component/entityComponent';

interface EntityConfig {
    tag: string;
    onUpdate: (frameDelta: number) => void;
    components?: EntityComponent[];
}

// TODO type-checking on accessing entity component data is gonna be...fun

export class Entity {

    private id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    private components = new Map<string, EntityComponent>();

    constructor(private config: EntityConfig) {
        if (config.components) {
            this.addComponents(config.components);
        }
    }

    public update(frameDelta: number): void {
        this.config.onUpdate(frameDelta);
    }

    public getTag(): string {
        return this.config.tag;
    }

    public getComponentByName(name: string): EntityComponent | undefined {
        // TODO error handling instead of undefined return type
        return this.components.get(name);
    }

    public addComponent(component: EntityComponent): void {
        this.components.set(component.name, component);
    }

    public addComponents(components: EntityComponent[]): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    public removeComponent(component: string | EntityComponent): void {
        if (this.isComponent(component)) {
            this.components.delete(component.name);
        }
        else {
            this.components.delete(component);
        }
    }

    public removeComponents(components: Array<string | EntityComponent>): void {
        for (const c of components) {
            this.removeComponent(c);
        }
    }

    public hasComponent(component: string | EntityComponent): boolean {
        let name: string;

        if (this.isComponent(component)) {
            name = component.name;
        }
        else {
            name = component;
        }

        return this.components.has(name);
    }

    public hasComponents(components: Array<string | EntityComponent>): boolean {
        for (const c of components) {
            if (!this.hasComponent(c)) {
                return false;
            }
        }

        return true;
    }

    private isComponent(component: string | EntityComponent): component is EntityComponent {
        return !!(component as EntityComponent).name ?? false
    }
}
