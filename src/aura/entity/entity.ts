import { Component } from '../component/component';
import { AuraError } from '../core/aura.error';
import { Game } from '../core/game';
import { EntityConfig } from './entity.config';

/* eslint-disable @typescript-eslint/no-unused-vars */

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
     * Optional frame update function called by the EntityManager during frame execution, implementable by concrete Entities
     *
     * @see EntityManager
     *
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game, frameDelta: number): void { }

    /**
     * Optional collision callback method called by the collision system when this Entity begins colliding with another, implementable by
     *   concrete Entities
     *
     * @param game a reference to the Game, for setting data, switching States or similar
     * @param other the Entity with which collision has begun
     */
    public onCollisionStart(game: Game, other: Entity): void { }

    /**
     * Optional collision callback method called by the collision system when this Entity continues to collide with another on the current
     *   frame, implementable by concrete Entities
     *
     * @param game a reference to the Game, for setting data, switching States or similar
     * @param other the Entity with which collision continues
     */
    public onCollisionContinue(game: Game, other: Entity): void { }

    /**
     * Optional collision callback method called by the collision system when this Entity stops colliding with another, implementable by
     *   concrete Entities
     *
     * @param game a reference to the Game, for setting data, switching states or similar
     * @param other the Entity with which collision has ended
     */
    public onCollisionEnd(game: Game, other: Entity): void { }

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
     * Remove a Component from the Entity by Component name
     *
     * @param name the name of the Component to remove
     */
    public removeComponent(name: string): void {
        this.components.delete(name);
    }

    /**
     * Remove a list of Components from the Entity by Component name
     *
     * @param names the names of the Components to remove
     */
    public removeComponents(...names: Array<string>): void {
        for (const n of names) {
            this.removeComponent(n);
        }
    }

    /**
     * Check if the Entity has a Component by Component name
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

    // TODO dead class/type-based component get
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

    // TODO dead class/type-based component remove
    // public removeComponent(component: Component): void {
    //     this.components.delete(component.name);
    // }
    // public removeComponents(...components: Array<Component>): void {
    //     for (const c of components) {
    //         this.removeComponent(c);
    //     }
    // }

    // TODO dead class/type-based component has
    // public hasComponent(component: Component): boolean {
    //     return this.components.has(component.name);
    // }
}
