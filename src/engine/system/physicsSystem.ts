import { Transform } from '@protogl/entity/component/transform';
import { Vec2 } from '@protogl/math/vec2';
import { System } from '@protogl/system/system';

export class PhysicsSystem extends System {

    public tick(frameDelta: number): void {
        const movers = this.game.entityManager.filterEntitiesByComponent(Transform);

        for (const e of movers) {
            const transform = e.getComponentByName('Transform') as Transform;

            const movement = Vec2.scale(transform.velocity, frameDelta / 100);

            transform.position = Vec2.add(transform.position, movement);
        }
    }
}
