import { Color } from '../../math/color';
import { Component } from '../component';

/**
 * MultiColor Component, defining an arbitrary number of colors for the Entity
 *
 * A MultiColor's colors will be cycled through on a per-vertex basis, allowing for per-vertex colouration
 */
export class MultiColor extends Component {

    /**
     * Float32Array form of all colors, to be accessed in vertex compilation
     */
    public readonly colors: Float32Array;

    /**
     * Constructor. Take the list of Colors to use and provide the name 'MultiColor' to the parent class
     *
     * @param colors the list of Colors to use
     */
    constructor(colors: ReadonlyArray<Color>) {
        super('MultiColor');

        this.colors = new Float32Array(colors.length * 4);
        colors.forEach((c, i) => this.colors.set(c.float32Array, i * 4));
    }
}
