import { Vec3 } from '../../math/vec3';
import { EntityComponent } from './entityComponent';

export class FlatColor implements EntityComponent {
    public name = 'FlatColor';

    constructor(public color = new Vec3(255, 255, 255)) { }
}
