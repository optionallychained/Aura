import { Component } from '../component';
import { EntityConfig } from './entity.config';

/**
 * Class representing an Entity.
 *
 * An Entity is any object existing within the game; be it a player, enemy, pickup, level object, camera, UI element, etc.
 *
 * Entities maintain a list of Components, which give them their properties and behaviour and allow Systems to operate on them as necessary.
 *
 * @see Component
 */
export class Entity {

    /** Unique id for the Entity */
    public id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);

    /** Entity Components, mapped by their name for simple management */
    private components = new Map<string, Component>();

    /**
     * Constructor. Take and store the Entity's config and initialise the Entity with Components if provided in the config
     *
     * @param config entity configuration
     */
    constructor(private readonly config: EntityConfig) {
        // TODO initialization-time verification by way of EntityShaderMap and shader registrations that:
        //   - an Entity can be rendered with its shader based on its components
        //     - ...working off the knowledge of which Components are required to source which shader attributes+uniforms
        //   - its Model is compatible with its Shader (?)
        if (config.components) {
            this.addComponents(config.components);
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
    public tick(frameDelta: number): void {
        this.config.tick?.(frameDelta);
    }

    /**
     * Getter for the named Component
     *
     * // TODO error handling for Components
     *
     * @param name the name of the Component to retrieve
     *
     * @typeparam T the type of the retrieved Component
     *
     * @returns the retrieved Component
     */
    public getComponent<T extends Component>(name: string): T {
        return this.components.get(name) as T;
    }

    /**
     * Add a given Component to the Entity
     *
     * @param component the Component to add
     */
    public addComponent(component: Component): void {
        this.components.set(component.name, component);
    }

    /**
     * Add a given list of Components to the Entity
     *
     * @param components the Components to add
     */
    public addComponents(components: Array<Component>): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    /**
     * Remove the named Component from the Entity
     *
     * // TODO error handling for Components
     *
     * @param name the name of the Component to remove
     */
    public removeComponent(name: string): void {
        this.components.delete(name);
    }

    /**
     * Remove the named Components from the Entity
     *
     * // TODO error handling for Components
     *
     * @param names the names of the Components to remove
     */
    public removeComponents(names: Array<string>): void {
        for (const c of names) {
            this.removeComponent(c);
        }
    }

    /**
     * Check if the Entity has the named Component
     *
     * // TODO this doesn't appear to work in the distribution version of the demo. Why?
     *
     * @param name the name of the Component to check
     *
     * @returns a boolean indicating whether or not the Entity has the named Component
     */
    public hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    /**
     * Check if the Entity has the named Components
     *
     * @param names the names of the Components to check
     *
     * @returns a boolean indicating whether or not the Entity has all of the named Components
     */
    public hasComponents(names: Array<string>): boolean {
        for (const c of names) {
            if (!this.hasComponent(c)) {
                return false;
            }
        }

        return true;
    }
}
