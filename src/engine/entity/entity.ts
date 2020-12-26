import { EntityComponent } from '@protogl/entity/component/entityComponent';

interface EntityConfig {
    tag: string;
    onUpdate: (frameDelta: number) => void;
    components?: EntityComponent[];
}

// TODO type-checking on accessing entity component data is gonna be...fun

export class Entity {

    private id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    // TODO memoization of component names supported via add() and remove()
    private components: { [name: string]: EntityComponent } = {};

    constructor(private config: EntityConfig) {
        if (config.components) {
            this.addComponents(config.components);
        }
    }

    public update(frameDelta: number): void {
        this.config.onUpdate(frameDelta);
    }

    public getComponentByName(name: string): EntityComponent {
        return this.components[name];
    }

    public addComponent(component: EntityComponent): void {
        this.components[component.name] = component;
    }

    public addComponents(components: EntityComponent[]): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    public removeComponent(component: string | EntityComponent): void {
        if (this.isComponent(component)) {
            delete this.components[component.name];
        }
        else {
            delete this.components[component];
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

        // TODO memoization of names
        return Object.keys(this.components).includes(name);
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
