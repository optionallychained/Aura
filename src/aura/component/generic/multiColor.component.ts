import { Color } from '../../math/color';
import { Component } from '../component';

/**
 * Built-in MultiColor Component, defining an arbitrary number of colors for the Entity
 *
 * MultiColor colors will be cycled through on a per-vertex basis, allowing for per-vertex colouration
 */
export class MultiColor extends Component {

    /**
     * Counter for the current Color used in nextColor()
     */
    private currentColor = 0;

    /**
     * Constructor. Take and store the colors to use
     *
     * @param colors the colors to use
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
