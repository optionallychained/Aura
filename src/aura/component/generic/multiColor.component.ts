import { Color } from '../../math/color';
import { Component } from '../component';
import { Name } from '../../core/name.decorator';

/**
 * MultiColor Component, defining an arbitrary number of colors for the Entity
 *
 * A MultiColor's colors will be cycled through on a per-vertex basis, allowing for per-vertex colouration
 */
@Name('MultiColor')
export class MultiColor extends Component {

    /**
     * Counter for the current Color used in nextColor()
     */
    private currentColor = 0;

    /**
     * Constructor. Take the list of Colors to use and provide the name 'MultiColor' to the parent class
     *
     * @param colors the list of Colors to use
     */
    constructor(public readonly colors: ReadonlyArray<Color>) {
        super('MultiColor');
    }

    /**
     * Retrieve the next Color in the list and cycle the counter
     */
    public nextColor(): Color {
        const color = this.colors[this.currentColor++];

        if (this.currentColor === this.colors.length) {
            this.currentColor = 0;
        }

        return color;
    }
}
