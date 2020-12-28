import { Vec3 } from '../../math/vec3';
import { Component } from './component';

export class FlatColor extends Component {

    constructor(public color = new Vec3(255, 255, 255)) {
        super('FlatColor');
    }
}
