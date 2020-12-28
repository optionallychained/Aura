import { Component } from './component/component';

interface EntityConfig {
    tag: string;
    onUpdate: (frameDelta: number) => void;
    components?: Component[];
}

// TODO type-checking on accessing entity component data is gonna be...fun

export class Entity {

    private id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    private components = new Map<string, Component>();

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

    public getComponentByName(name: string): Component | undefined {
        // TODO error handling instead of undefined return type
        return this.components.get(name);
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
