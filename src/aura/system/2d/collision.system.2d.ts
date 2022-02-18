import { BoxCollider2D } from '../../component/2d/boxCollider.component.2d';
import { Transform2D } from '../../component/2d/transform.component.2d';
import { Game2D } from '../../core/2d/game.2d';
import { Entity } from '../../entity/entity';
import { System2D } from './system.2d';

/**
 * Built-in concrete 2D Collision System, handling the collision testing of two dimensional Entities which are capable of colliding with one
 *   another
 *
 * To be eligible for collision, an Entity must have a Transform2D and a BoxCollider2D
 */
export class Collision extends System2D {

    /** Simple array of `id-id` collision strings, used for tracking Entity-Entity collisions and invoking correct collision callbacks */
    // TODO how could we go about cleaning up stale collision strings for Entity pairings which have become invalid (eg by Entity removal)?
    private collisions: Array<string> = [];

    /**
     * Constructor. Provide the name 'Collision' to the parent class
     */
    constructor() {
        super('Collision');
    }

    /**
     * Concrete tick lifecycle method implementing the Collision System's per-frame functionality
     *
     * Check for collision between all eligible Entities and call their collision handling methods as appropriate
     *
     * @param game the Game2D the System is running within
     */
    public tick(game: Game2D): void {
        const collidables = game.world.filterEntitiesByComponentNames('Transform2D', 'BoxCollider2D');

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                const collisionId = `${collidables[i].id}-${collidables[j].id}`;

                if (this.collides(collidables[i], collidables[j])) {
                    if (!this.collisions.includes(collisionId)) {
                        collidables[i].onCollisionStart(game, collidables[j]);
                        collidables[j].onCollisionStart(game, collidables[i]);

                        this.collisions.push(collisionId);
                    }
                    else {
                        collidables[i].onCollisionContinue(game, collidables[j]);
                        collidables[j].onCollisionContinue(game, collidables[i]);
                    }
                }
                else if (this.collisions.includes(collisionId)) {
                    collidables[i].onCollisionEnd(game, collidables[j]);
                    collidables[j].onCollisionEnd(game, collidables[i]);

                    this.collisions.splice(this.collisions.indexOf(collisionId), 1);
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
        const e1Dimensions = e1Box.dimensions ?? e1Transform.scale;

        const e1Left = e1Transform.position.x - (e1Dimensions.x / 2);
        const e1Right = e1Transform.position.x + (e1Dimensions.x / 2);
        const e1Top = e1Transform.position.y + (e1Dimensions.y / 2);
        const e1Bottom = e1Transform.position.y - (e1Dimensions.y / 2);

        const e2Transform = e2.getComponent<Transform2D>('Transform2D');
        const e2Box = e2.getComponent<BoxCollider2D>('BoxCollider2D');
        const e2Dimensions = e2Box.dimensions ?? e2Transform.scale;

        const e2Left = e2Transform.position.x - (e2Dimensions.x / 2);
        const e2Right = e2Transform.position.x + (e2Dimensions.x / 2);
        const e2Top = e2Transform.position.y + (e2Dimensions.y / 2);
        const e2Bottom = e2Transform.position.y - (e2Dimensions.y / 2);

        return (
            e1Left < e2Right &&
            e1Right > e2Left &&
            e1Top > e2Bottom &&
            e1Bottom < e2Top
        );
    }
}
