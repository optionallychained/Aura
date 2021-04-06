import { Component } from '../component';
import { AuraError, Game } from '../core';
import { EntityConfig } from './entity.config';

/**
 * Class representing an Entity
 *
 * An Entity is any object existing within the game; be it a player, enemy, pickup, level object, camera, UI element, etc
 *
 * Entities maintain a list of Components, which give them their properties and behaviour and allow Systems to operate on them as necessary
 *
 * // TODO look at ways of reimplementing get/has Component by Type/Class
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
    public abstract tick(game: Game, frameDelta: number): void;

    /**
     * Get a Component from the Entity by name
     *
     * Throws an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
     *
     * @typeparam T the type of the Component that will be returned
     *
     * @param name the name of the Component to retrieve
     *
     * @returns the Component
     */
    public getComponent<T extends Component>(name: string): T {
        if (!this.hasComponent(name)) {
            throw new AuraError({
                class: 'Entity',
                method: 'getComponent',
                message: `Failed to retrieve Component ${name} for Entity with tag ${this.tag}`
            });
        }

        return this.components.get(name) as T;
    }

    // /**
    //  * // TODO DEAD - this does NOT work in distribution builds
    //  * //   reason: (component).name is the *prototype name*, at runtime in obfuscated builds indeterminate
    //  *
    //  * it would be nice to be able to reimplement the pattern (entity).getComponent(Class)...somehow. Enforced prototype naming?
    //  *
    //  * Get a Component from the Entity by Component class
    //  *
    //  * @typeparam T (autoinferred) the type of the Component to retrieve
    //  *
    //  * @param component the Component class to retrieve
    //  *
    //  * @returns the retrieved Component
    //  */
    // public getComponentByType<T extends Component>(component: ClassType<T>): T {
    //     // throw an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
    //     if (!this.hasComponent(component)) {
    //         throw new AuraError({
    //             class: 'Entity',
    //             method: 'getComponent',
    //             message: `Failed to retrieve Component '${component.name}' for Entity with tag '${this.tag}'`
    //         });
    //     }

    //     return this.components.get(component.name) as T;
    // }

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
     * Check if the Entity has a Component by Component name
     *
     * // TODO this doesn't appear to work in dist. Why?
     *
     * @param name the name of the Component to check
     *
     * @returns a boolean indicating whether or not the Entity has the named Component
     */
    public hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    /**
     * Check if the Entity has a list of Components by Component name
     *
     * @param names the names of the Components to check
     *
     * @returns a boolean indicating whether or not the Entity has all of the named Components
     */
    public hasComponents(...names: Array<string>): boolean {
        for (const n of names) {
            if (!this.hasComponent(n)) {
                return false;
            }
        }

        return true;
    }
}
