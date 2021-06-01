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
    public tick(game: Game2D): void {
        const collidables = game.world.filterEntitiesByComponentNames('Transform2D', 'BoxCollider2D');

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                if (this.collides(collidables[i], collidables[j])) {
                    (collidables[i].getComponent<BoxCollider2D>('BoxCollider2D')).onCollision?.(game, collidables[i], collidables[j]);
                    (collidables[j].getComponent<BoxCollider2D>('BoxCollider2D')).onCollision?.(game, collidables[j], collidables[i]);
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
        const e1Transform = e1.getComponent<Transform2D>('Transform2D');
        const e1Box = e1.getComponent<BoxCollider2D>('BoxCollider2D');

        const e1Left = e1Transform.position.x - (e1Box.dimensions.x / 2);
        const e1Right = e1Transform.position.x + (e1Box.dimensions.x / 2);
        const e1Top = e1Transform.position.y + (e1Box.dimensions.y / 2);
        const e1Bottom = e1Transform.position.y - (e1Box.dimensions.y / 2);

        const e2Transform = e2.getComponent<Transform2D>('Transform2D');
        const e2Box = e2.getComponent<BoxCollider2D>('BoxCollider2D');

        const e2Left = e2Transform.position.x - (e2Box.dimensions.x / 2);
        const e2Right = e2Transform.position.x + (e2Box.dimensions.x / 2);
        const e2Top = e2Transform.position.y + (e2Box.dimensions.y / 2);
        const e2Bottom = e2Transform.position.y - (e2Box.dimensions.y / 2);

        return (
            e1Left < e2Right &&
            e1Right > e2Left &&
            e1Top > e2Bottom &&
            e1Bottom < e2Top
        );
    }
}
