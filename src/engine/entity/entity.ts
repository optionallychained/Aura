import { Component } from '../component';
import { ProtoGLError } from '../core';
import { EntityConfig } from './entity.config';

/**
 * Class representing an Entity
 *
 * An Entity is any object existing within the game; be it a player, enemy, pickup, level object, camera, UI element, etc
 *
 * Entities maintain a list of Components, which give them their properties and behaviour and allow Systems to operate on them as necessary
 *
 * @see Component
 */
export abstract class Entity {

    /** Unique id for the Entity */
    public readonly id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);

    /** Entity Components, mapped by their name for simple management */
    private readonly components = new Map<string, Component>();

    /**
     * Constructor. Take and store the Entity's config and initialise the Entity with Components if provided in the config
     *
     * @param config entity configuration
     */
    constructor(private readonly config: EntityConfig) {
        if (config.components) {
            this.addComponents(...config.components);
        }
    }

    /**
     * Getter for the Entity's tag, as provide in its config
     *
     * @returns the Entity's tag
     */
    public get tag(): string {
        return this.config.tag;
    }

    /**
     * Update function called by the EntityManager during frame execution. Runs the Entity's tick, if provided in its config
     *
     * @see EntityManager
     *
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public abstract tick(frameDelta: number): void;

    /**
     * Get a Component from the Entity by Component class
     *
     * @typeparam T (autoinferred) the type of the Component to retrieve
     *
     * @param component the Component class to retrieve
     *
     * @returns the retrieved Component
     */
    public getComponent<T extends Component>(component: ClassType<T>): T {
        // throw an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
        if (!this.hasComponent(component)) {
            throw new ProtoGLError({
                class: 'Entity',
                method: 'getComponent',
                message: `Failed to retrieve Component '${component.name}' for Entity with tag '${this.tag}'`
            });
        }

        return this.components.get(component.name) as T;
    }

    /**
     * Get a Component from the Entity by Component name
     *
     * @typeparam T the type of the Component to retrieve
     *
     * @param name the name of the Component to retrieve
     *
     * @returns the retrieved Component
     */
    public getComponentByName<T extends Component>(name: string): T {
        // throw an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
        if (!this.hasComponentWithName(name)) {
            throw new ProtoGLError({
                class: 'Entity',
                method: 'getComponentByName',
                message: `Failed to retrieve Component '${name}' for Entity with tag '${this.tag}'`
            });
        }

        return this.components.get(name) as T;
    }

    /**
     * Add a Component to the Entity
     *
     * @param component the Component to add
     */
    public addComponent(component: Component): void {
        this.components.set(component.name, component);
    }

    /**
     * Add a list of Components to the Entity
     *
     * @param components the Components to add
     */
    public addComponents(...components: Array<Component>): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    /**
     * Remove a Component from the Entity by Component class
     *
     * @param component the Component to remove
     */
    public removeComponent(component: Component): void {
        this.components.delete(component.name);
    }

    /**
     * Remove a list of Components from the Entity by Component class
     *
     * @param components the Components to remove
     */
    public removeComponents(...components: Array<Component>): void {
        for (const c of components) {
            this.removeComponent(c);
        }
    }

    /**
     * Remove a Component from the Entity by Component name
     *
     * @param name the name of the Component to remove
     */
    public removeComponentByName(name: string): void {
        this.components.delete(name);
    }

    /**
     * Remove a list of Components from the Entity by Component name
     *
     * @param names the names of the Components to remove
     */
    public removeComponentsByName(...names: Array<string>): void {
        for (const n of names) {
            this.removeComponentByName(n);
        }
    }

    /**
     * Check if the Entity has a Component by Component class
     *
     * @param component the Component to check
     *
     * @returns a boolean indicating whether or not the Entity has the Component
     */
    public hasComponent(component: Component): boolean {
        return this.components.has(component.name);
    }

    /**
     * Check if the Entity has a list of Components by Component class
     *
     * @param components the Components to check
     *
     * @returns a boolean indicating whether or not the Entity has all of the Components
     */
    public hasComponents(...components: Array<Component>): boolean {
        for (const c of components) {
            if (!this.hasComponent(c)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if the Entity has a Component by Component name
     *
     * // TODO this doesn't appear to work in dist. Why?
     *
     * @param name the name of the Component to check
     *
     * @returns a boolean indicating whether or not the Entity has the named Component
     */
    public hasComponentWithName(name: string): boolean {
        return this.components.has(name);
    }

    /**
     * Check if the Entity has a list of Components by Component name
     *
     * @param names the names of the Components to check
     *
     * @returns a boolean indicating whether or not the Entity has all of the named Components
     */
    public hasComponentsWithNames(...names: Array<string>): boolean {
        for (const n of names) {
            if (!this.hasComponentWithName(n)) {
                return false;
            }
        }

        return true;
    }
}
