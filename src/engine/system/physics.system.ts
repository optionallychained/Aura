import { Game } from '../core/game';
import { Transform } from '../entity/component/transform.component';
import { Vec2 } from '../math/vec2';
import { System } from './system';

/**
 * Built-in Physics System, handling the movement of Entities which are capable of moving.
 *
 * To be eligible for movement, an Entity must have a Transform (position and dimension within the world).
 *
 * // TODO memoization (defer to EntityManager?) of 'movers' filter?
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

            transform.position = Vec2.add(
                transform.position,
                Vec2.scale(transform.velocity, frameDelta / 1000)
            );
        }
    }
}
