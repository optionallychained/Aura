import { Transform } from '../../component/3d/transform.component';
import { Game } from '../../core/3d/game';
import { Vec3 } from '../../math/vec3';
import { System } from './system';

/**
 * Built-in concrete 3D Physics System, implementing movement for Entities in 3D Games
 *
 * To be eligible for movement, an Entity must have a Transform Component
 */
export class Physics extends System {

    /**
     * Constructor. Provide the name 'Physics' to the parent class
     */
    constructor() {
        super('Physics');
    }

    /**
     * Concrete update method, implementing per-frame movement functionality for eligible Entities
     *
     * @param game the 3D Game the System is operating within
     * @param frameDelta the frame delta as calculated by the Game
     */
    public tick(game: Game, frameDelta: number): void {
        const movers = game.world.filterEntitiesByComponent(Transform);

        for (const e of movers) {
            const transform = e.getComponent(Transform);
            transform.move(Vec3.scale(transform.velocity, frameDelta / 1000));
        }
    }
}
