import { Vec2 } from '../../math/vec2';
import { Component } from './component';

export class Transform extends Component {

    constructor(public position = new Vec2(), public dimensions = new Vec2(), public velocity = new Vec2()) {
        super('Transform');
    }
}
