import { BoxCollider } from '../../component/2d/boxCollider.component';
import { Transform } from '../../component/2d/transform.component';
import { Game } from '../../core/2d/game';
import { Entity } from '../../entity/entity';
import { System } from './system';

/**
 * Built-in concrete 2D Collision System, implementing simple AABB collision for Entities in 2D Games
 *
 * Tracks Entity-to-Entity collisions for properly invoking an Entity's onCollisionStart, onCollisionContinue and onCollisionEnd methods
 *
 * To be eligible for collision, an Entity must have both a Transform Component and a BoxCollider Component
 */
export class Collision extends System {

    /** Simple array of `id-id` collision strings, used for tracking Entity-Entity collisions and invoking correct collision callbacks */
    // TODO issues with cleaning up stale match strings for removed Entities
    private collisions: Array<string> = [];

    /**
     * Constructor. Provide the name 'Collision' to the parent class
     */
    constructor() {
        super('Collision');
    }

    /**
     * Concrete update method, implementing per-frame collision functionality for eligible Entities
     *
     * Check for and track collision between all eligible Entities and call their appropriate collision handling methods
     *
     * @param game the 2D Game the System is operating within
     */
    public tick(game: Game): void {
        const collidables = game.world.filterEntitiesByComponentNames('Transform', 'BoxCollider');

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
     * Actual collision detection method, implementing simple AABB detection between Entities
     *
     * @param e1 the first Entity
     * @param e2 the second Entity
     *
     * @returns whether or not the two Entities are colliding
     */
    private collides(e1: Entity, e2: Entity): boolean {
        const e1Transform = e1.getComponent<Transform>('Transform');
        const e1Box = e1.getComponent<BoxCollider>('BoxCollider');
        const e1Dimensions = e1Box.dimensions ?? e1Transform.scale;

        const e1Left = e1Transform.position.x - (e1Dimensions.x / 2);
        const e1Right = e1Transform.position.x + (e1Dimensions.x / 2);
        const e1Top = e1Transform.position.y + (e1Dimensions.y / 2);
        const e1Bottom = e1Transform.position.y - (e1Dimensions.y / 2);

        const e2Transform = e2.getComponent<Transform>('Transform');
        const e2Box = e2.getComponent<BoxCollider>('BoxCollider');
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
