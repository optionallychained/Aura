import { Component } from '../component/component';
import { AuraError } from '../core/aura.error';
import { GameBase } from '../core/game.base';
import { EntityConfig } from './entity.config';

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Abstract Entity - any object existing in a Game's World, Text or UI, comprised of Components and handled by respective EntityManagers
 *
 * Concrete Entities implemented in Games should extend from this class, overring its methods as required
 */
export abstract class Entity {

    /** Unique id for the Entity */
    public readonly id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);

    /** Entity Components, mapped by their name for simple management */
    private readonly components = new Map<string, Component>();

    /**
     * Constructor. Take an EntityConfig and initialise the Entity's Components, if provided
     *
     * @param config the EntityConfig
     */
    constructor(private readonly config: EntityConfig) {
        if (config.components) {
            this.addComponents(...config.components);
        }
    }

    /**
     * Retrieve the Entity's tag as provided in its config
     *
     * @returns the Entity's tag
     */
    public get tag(): string {
        return this.config.tag;
    }

    /**
     * Optional frame update function called by the EntityManager during frame execution, implementable by concrete Entities
     *
     * @param game the Game the System is operating within
     * @param frameDelta the frame delta as calculated by the Game
     */
    public tick(game: GameBase, frameDelta: number): void { }

    /**
     * Optional collision callback method for the start of a collision with another specific Entity, implementable by concrete Entities
     *
     * @param game the 2D or 3D Game the System is operating within
     * @param other the Entity with which collision has begun
     */
    public onCollisionStart(game: GameBase, other: Entity): void { }

    /**
     * Optional collision callback method for the continuation of a collision with another specific Entity, implentable by concrete Entities
     *
     * @param game the 2D or 3D Game the System is operating within
     * @param other the Entity with which collision continues
     */
    public onCollisionContinue(game: GameBase, other: Entity): void { }

    /**
     * Optional collision callback method for the end of a collision with another specific Entity, implementable by concrete Entities
     *
     * @param game the 2D or 3D Game the System is operating within
     * @param other the Entity with which collision has ended
     */
    public onCollisionEnd(game: GameBase, other: Entity): void { }

    /**
     * Retrieve a Component by name
     *
     * Throws an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
     *
     * @typeparam T the type of the Component to retrieve
     *
     * @param name the name of the Component to retrieve
     *
     * @returns the retrieved Component
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
     * Remove the named Component from the Entity
     *
     * @param name the name of the Component to remove
     */
    public removeComponent(name: string): void {
        this.components.delete(name);
    }

    /**
     * Remove a list of named Components from the Entity
     *
     * @param names the names of the Components to remove
     */
    public removeComponents(...names: Array<string>): void {
        for (const n of names) {
            this.removeComponent(n);
        }
    }

    /**
     * Check if the Entity has a named Component
     *
     * @param name the name of the Component to check
     *
     * @returns whether or not the Entity has the named Component
     */
    public hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    /**
     * Check if the Entity has a list of named Components
     *
     * @param names the names of the Components to check
     *
     * @returns whether or not the Entity has all of the named Components
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
