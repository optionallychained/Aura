import { Component } from './component/component';
import { EntityConfig } from './entity.config';

export class Entity {

    private id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    private components = new Map<string, Component>();

    constructor(private config: EntityConfig) {
        if (config.components) {
            this.addComponents(config.components);
        }
    }

    public tick(frameDelta: number): void {
        this.config.tick?.(frameDelta);
    }

    public getTag(): string {
        return this.config.tag;
    }

    // TODO either want error handling for component not found (.get() => undefined), or assurance by way of param type/map type crossover
    // alternatively just accept the | undefined specifier from .get() and force handling on consumers
    // TODO maybe use type mapping to ensure that name is a valid component name
    // how would this be extended by game implementations? - interface merging?
    public getComponent<T extends Component>(name: string): T {
        return this.components.get(name) as T;
    }

    public addComponent(component: Component): void {
        this.components.set(component.getName(), component);
    }

    public addComponents(components: Component[]): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    public removeComponent(component: string): void {
        this.components.delete(component);
    }

    public removeComponents(components: string[]): void {
        for (const c of components) {
            this.removeComponent(c);
        }
    }

    public hasComponent(component: string): boolean {
        return this.components.has(component);
    }

    public hasComponents(components: string[]): boolean {
        for (const c of components) {
            if (!this.hasComponent(c)) {
                return false;
            }
        }

        return true;
    }
}
