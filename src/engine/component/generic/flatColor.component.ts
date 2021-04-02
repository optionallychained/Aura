import { Color } from '../../math';
import { Component } from '../component';

/**
 * Built-in FlatColor Component, defining a basic singular color for the Entity
 */
export class FlatColor extends Component {

    /**
     * Constructor. Take and store the Color, and provide the name 'FlatColor' to the parent class
     *
     * @param color the Color. Defaults to white
     */
    constructor(public readonly color = new Color(255, 255, 255)) {
        super('FlatColor');
    }
}
