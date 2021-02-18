import { Transform } from '../component';
import { Game } from '../core';
import { Vec2 } from '../math';
import { System } from './system';

/**
 * Built-in Physics System, handling the movement of Entities which are capable of moving.
 *
 * To be eligible for movement, an Entity must have a Transform (position and dimension within the world).
 *
 * @see Transform
 */
export class PhysicsSystem extends System {

    /**
     * Constructor. Provide the name 'Physics' to the parent class
     */
    constructor() {
        super('Physics');
    }

    /**
     * Concrete update function implementing the Physics System's per-frame functionality.
     *
     * Move every eligible Entity by their velocity, normalized using the frameDelta
     *
     * @param game the Game the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game, frameDelta: number): void {
        const movers = game.entityManager.filterEntitiesByComponent('Transform');

        for (const e of movers) {
            const transform = e.getComponent<Transform>('Transform');
            transform.translate(Vec2.scale(transform.velocity, frameDelta / 1000));
        }
    }
}
