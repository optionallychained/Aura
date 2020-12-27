import { EntityComponent } from '@protogl/entity/component/entityComponent';
import { Entity } from '@protogl/entity/entity';
import { Vec2 } from '@protogl/math/vec2';

export class AABBCollisionBox implements EntityComponent {

    public name = 'AABBCollisionBox';

    constructor(public dimensions = new Vec2(), public onCollision: (other: Entity) => void) { }
}
