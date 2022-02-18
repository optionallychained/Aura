import { Transform3D } from '../../component/3d/transform.component.3d';
import { Game3D } from '../../core/3d/game.3d';
import { Vec3 } from '../../math/vec3';
import { System3D } from './system.3d';

/**
 * Built-in concrete 3D Physics System, handling the movement of three dimensional Entities which are capable of moving
 *
 * To be eligible for movement, an Entity must have a Transform3D
 */
export class Physics extends System3D {

    /**
     * Constructor. Provide the name 'Physics' to the parent class
     */
    constructor() {
        super('Physics');
    }

    /**
     * Concrete tick lifecycle method implementing the Physics System's per-frame functionality
     *
     * Move every eligible Entity by their velocity, normalized using the frameDelta
     *
     * @param game the Game3D the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game3D, frameDelta: number): void {
        const movers = game.world.filterEntitiesByComponentName('Transform3D');

        for (const e of movers) {
            const transform = e.getComponent<Transform3D>('Transform3D');
            transform.move(Vec3.scale(transform.velocity, frameDelta / 1000));
        }
    }
}
