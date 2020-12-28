import { Game } from '../core/game';
import { AABBCollisionBox } from '../entity/component/AABBCollisionBox';
import { Transform } from '../entity/component/transform';
import { Entity } from '../entity/entity';
import { System } from './system';

export class CollisionSystem extends System {

    constructor() {
        super('Collision');
    }

    public tick(game: Game): void {
        const collidables = game.entityManager.filterEntitiesByComponents(['Transform', 'AABBCollisionBox']);

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                if (this.collides(collidables[i], collidables[j])) {
                    (collidables[i].getComponentByName('AABBCollisionBox') as AABBCollisionBox).onCollision(collidables[j]);
                    (collidables[j].getComponentByName('AABBCollisionBox') as AABBCollisionBox).onCollision(collidables[i]);
                }
            }
        }
    }

    private collides(e1: Entity, e2: Entity): boolean {
        const e1Transform = e1.getComponentByName('Transform') as Transform;
        const e1Box = e1.getComponentByName('AABBCollisionBox') as AABBCollisionBox;

        const e2Transform = e2.getComponentByName('Transform') as Transform;
        const e2Box = e2.getComponentByName('AABBCollisionBox') as AABBCollisionBox;

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
