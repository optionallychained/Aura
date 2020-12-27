import { Vec2 } from '../../math/vec2';
import { EntityComponent } from './entityComponent';

export class Transform implements EntityComponent {

    public name = 'Transform';

    constructor(public position = new Vec2(), public dimensions = new Vec2(), public velocity = new Vec2()) { }
}
