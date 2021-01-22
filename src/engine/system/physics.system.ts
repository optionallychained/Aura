import { Game } from '../core/game';
import { Transform } from '../entity/component/transform.component';
import { Vec2 } from '../math/vec2';
import { System } from './system';

export class PhysicsSystem extends System {

    constructor() {
        super('Physics');
    }

    public tick(game: Game, frameDelta: number): void {
        const movers = game.entityManager.filterEntitiesByComponent('Transform');

        for (const e of movers) {
            const transform = e.getComponent<Transform>('Transform');

            const movement = Vec2.scale(transform.velocity, frameDelta / 100);

            transform.position = Vec2.add(transform.position, movement);
        }
    }
}
