import { Transform3D } from '../../component/3d';
import { Game } from '../../core';
import { Vec3 } from '../../math';
import { System } from '../system';

/**
 * Built-in 3D Physics System, handling the movement of three dimensional Entities which are capable of moving
 *
 * To be eligible for movement, an Entity must have a Transform3D
 *
 * @see Transform2D
 */
export class Physics extends System {

    /**
     * Constructor. Provide the name 'Physics3D' to the parent class
     */
    constructor() {
        super('Physics3D');
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
        const movers = game.world.filterEntitiesByComponentName('Transform3D');

        for (const e of movers) {
            const transform = e.getComponent(Transform3D);
            transform.move(Vec3.scale(transform.velocity, frameDelta / 1000));
        }
    }
}
