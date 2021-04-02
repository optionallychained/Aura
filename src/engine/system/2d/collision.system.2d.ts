import { BoxCollider2D, Transform2D } from '../../component/2d';
import { Game2D } from '../../core/2d';
import { Entity } from '../../entity';
import { System2D } from './system.2d';

/**
 * Built-in concrete 2D Collision System, handling the collision testing of two dimensional Entities which are capable of colliding with one
 *   another
 *
 * To be eligible for collision, an Entity must have a Transform2D and a BoxCollider2D
 */
export class Collision2D extends System2D {

    /** Provide the System's name */
    public readonly name = 'Collision2D';

    /**
     * Concrete tick lifecycle methid implementing the Collision System's per-frame functionality
     *
     * Check for collision between all eligible Entities and call their collision handling methods if appropriate
     *
     * @param game the Game2D the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game2D, frameDelta: number): void {
        const collidables = game.world.filterEntitiesByComponentNames('Transform2D', 'BoxCollider2D');

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                if (this.collides(collidables[i], collidables[j])) {
                    (collidables[i].getComponent(BoxCollider2D)).onCollision(game, collidables[j]);
                    (collidables[j].getComponent(BoxCollider2D)).onCollision(game, collidables[i]);
                }
            }
        }
    }

    /**
     * Actual collision detection method. Just checks whether the BoxColliders of the two entities, positioned correctly, overlap
     *
     * @param e1 the first Entity
     * @param e2 the second Entity
     *
     * @returns a boolean indicating whether or not the two Entities collide
     */
    private collides(e1: Entity, e2: Entity): boolean {
        const e1Transform = e1.getComponent(Transform2D);
        const e1Box = e1.getComponent(BoxCollider2D);

        const e2Transform = e2.getComponent(Transform2D);
        const e2Box = e2.getComponent(BoxCollider2D);

        // TODO collision after world coords involving transforms
        return false;

        // const e1Pos = e1Transform.position;
        // const e1Dim = e1Box.dimensions;
        // const e2Pos = e2Transform.position;
        // const e2Dim = e2Box.dimensions;

        // return (
        //     e1Pos.x < (e2Pos.x + e2Dim.x)
        //     &&
        //     (e1Pos.x + e1Dim.x) > e2Pos.x
        //     &&
        //     e1Pos.y < (e2Pos.y + e2Dim.y)
        //     &&
        //     (e1Pos.y + e1Dim.y) > e2Pos.y
        // )
    }
}
