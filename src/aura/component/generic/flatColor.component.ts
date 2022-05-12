import { Color } from '../../math/color';
import { Component } from '../component';
import { Name } from '../../core/name.decorator';

/**
 * FlatColor Component, defining a basic singular color for the Entity
 */
@Name('FlatColor')
export class FlatColor extends Component {

    /**
     * Constructor. Take the Color and provide the name 'FlatColor' to the parent class
     *
     * @param color the Color. Defaults to white
     */
    constructor(public readonly color = Color.white()) {
        super('FlatColor');
    }
}
