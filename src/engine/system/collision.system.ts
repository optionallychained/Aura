import { Game } from '../core/game';
import { AABBCollisionBox } from '../entity/component/AABBCollisionBox.component';
import { Transform } from '../entity/component/transform.component';
import { Entity } from '../entity/entity';
import { System } from './system';

/**
 * Built-in Collision System, handling the basic AABB Collision testing of all Entities which are capable of colliding with one another.
 *
 * To be eligible for collision, an Entity must have a Transform (position and dimensions in the world), and an AABBCollisionBox.
 *
 * // TODO optimisation of collision detection methods; memoization (defer to EntityManager?) of 'collidables' filter?
 *
 * @see AABBCollisionBox
 * @see Transform
 */
export class CollisionSystem extends System {

    /**
     * Constructor. Provide the name 'Collision' to the parent class
     */
    constructor() {
        super('Collision');
    }

    /**
     * Concrete update function implementing the Collision System's per-frame functionality.
     *
     * Check for collision between all eligible Entities and call their collision handling methods if appropriate
     *
     * @param game the Game the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game): void {
        const collidables = game.entityManager.filterEntitiesByComponents(['Transform', 'AABBCollisionBox']);

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                if (this.collides(collidables[i], collidables[j])) {
                    (collidables[i].getComponent<AABBCollisionBox>('AABBCollisionBox')).onCollision(game, collidables[j]);
                    (collidables[j].getComponent<AABBCollisionBox>('AABBCollisionBox')).onCollision(game, collidables[i]);
                }
            }
        }
    }

    /**
     * Actual collision detection method. Just checks whether the AABBCollisionBoxes of the two entities, positioned correctly, overlap
     *
     * @param e1 the first Entity
     * @param e2 the second Entity
     *
     * @returns a boolean indicating whether or not the two Entities collide
     */
    private collides(e1: Entity, e2: Entity): boolean {
        const e1Transform = e1.getComponent<Transform>('Transform');
        const e1Box = e1.getComponent<AABBCollisionBox>('AABBCollisionBox');

        const e2Transform = e2.getComponent<Transform>('Transform');
        const e2Box = e2.getComponent<AABBCollisionBox>('AABBCollisionBox');

        const e1Pos = e1Transform.position;
        const e1Dim = e1Box.dimensions;
        const e2Pos = e2Transform.position;
        const e2Dim = e2Box.dimensions;

        return (
            e1Pos.x < (e2Pos.x + e2Dim.x)
            &&
            (e1Pos.x + e1Dim.x) > e2Pos.x
            &&
            e1Pos.y < (e2Pos.y + e2Dim.y)
            &&
            (e1Pos.y + e1Dim.y) > e2Pos.y
        )
    }
}
