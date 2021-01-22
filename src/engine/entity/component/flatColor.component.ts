import { Vec3 } from '../../math/vec3';
import { Component } from './component';

/**
 * Built-in FlatColor Component, defining a basic color for the Entity.
 *
 * Utilised in rendering the Entity
 */
export class FlatColor extends Component {

    /**
     * Constructor. Take and store the color, and provide the name 'FlatColor' to the parent class
     *
     * @param color the color, expressed as a Vec3. Defaults to white
     */
    constructor(public color = new Vec3(255, 255, 255)) {
        super('FlatColor');
    }
}
