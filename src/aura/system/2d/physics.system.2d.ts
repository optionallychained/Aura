import { Transform2D } from '../../component/2d/transform.component.2d';
import { Game2D } from '../../core/2d/game.2d';
import { Vec2 } from '../../math/vec2';
import { System2D } from './system.2d';

/**
 * Built-in concrete 2D Physics System, handling the movement of two dimensional Entities which are capable of moving
 *
 * To be eligible for movement, an Entity must have a Transform2D
 */
export class Physics extends System2D {

    /** Provide the System's name */
    public readonly name = 'Physics2D';

    /**
     * Concrete tick lifecycle methid implementing the Physics System's per-frame functionality
     *
     * Move every eligible Entity by their velocity, normalized using the frameDelta
     *
     * @param game the Game2D the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game2D, frameDelta: number): void {
        const movers = game.world.filterEntitiesByComponentName('Transform2D');

        for (const e of movers) {
            const transform = e.getComponent<Transform2D>('Transform2D');
            transform.move(Vec2.scale(transform.velocity, frameDelta / 1000));
        }
    }
}
