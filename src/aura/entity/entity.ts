import { ClassType } from '../aura.types';
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
    private readonly components = new Map<string, object>();

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
     * Add a Component to the Entity
     *
     * @param component the Component to add
     */
    public addComponent(component: object): void {
        // TODO see Entity README; re-evaluate both object type + .constructor.name; + then @Component
        this.components.set(component.constructor.name, component);
    }

    /**
     * Add a list of Components to the Entity
     *
     * @param components the Components to add
     */
    public addComponents(...components: Array<object>): void {
        for (const c of components) {
            this.addComponent(c);
        }
    }

    /**
     * Remove a Component from the Entity
     *
     * @param component the class of the Component to remove
     */
    public removeComponent(component: ClassType<object>): void {
        this.components.delete(component.constructor.name);
    }

    /**
     * Remove a list of Components from the Entity
     *
     * @param components the classes of the Components to remove
     */
    public removeComponents(...components: Array<ClassType<object>>): void {
        for (const c of components) {
            this.removeComponent(c);
        }
    }

    /**
     * Retrieve a Component
     *
     * Throws an error if the Component is not found on the Entity to allow type safety + simplistic no-questions consumer calls
     *
     * @typeparam T (inferred) the type of the Component to retrieve
     *
     * @param component the class of the Component to retrieve
     *
     * @returns the retrieved Component
     */
    public getComponent<T extends object>(component: ClassType<T>): T {
        const c = this.components.get(component.name);

        if (!c) {
            throw new AuraError({
                class: 'Entity',
                method: 'getComponent',
                message: `Failed to retrieve Component '${component.name}' for Entity with tag '${this.tag}'`
            });
        }

        return c as T;
    }

    /**
     * Check if the Entity has a specific Component
     *
     * @param component the class of the Component to check for
     *
     * @returns whether or not the Entity has the Component
     */
    public hasComponent(component: ClassType<object>): boolean {
        return this.components.has(component.name);
    }

    /**
     * Check if the Entity has a list of Components
     *
     * @param components the classes of the Components to check for
     *
     * @returns whether or not the Entity has all of the named Components
     */
    public hasComponents(...components: Array<ClassType<object>>): boolean {
        for (const c of components) {
            if (!this.hasComponent(c)) {
                return false;
            }
        }

        return true;
    }
}
