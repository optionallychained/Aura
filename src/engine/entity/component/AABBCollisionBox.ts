import { Vec2 } from '../../math/vec2';
import { Entity } from '../entity';
import { EntityComponent } from './entityComponent';

export class AABBCollisionBox implements EntityComponent {

    public name = 'AABBCollisionBox';

    constructor(public dimensions = new Vec2(), public onCollision: (other: Entity) => void) { }
}
