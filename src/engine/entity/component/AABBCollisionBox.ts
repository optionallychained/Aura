import { Vec2 } from '../../math/vec2';
import { Entity } from '../entity';
import { Component } from './component';

export class AABBCollisionBox extends Component {

    constructor(public dimensions = new Vec2(), public onCollision: (other: Entity) => void) {
        super('AABBCollisionBox');
    }
}
