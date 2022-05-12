import { Color } from '../../math/color';
import { Component } from '../component.decorator';

/**
 * FlatColor Component, defining a basic singular color for the Entity
 */
@Component('FlatColor')
export class FlatColor {

    /**
     * Constructor. Take the Color and provide the name 'FlatColor' to the parent class
     *
     * @param color the Color. Defaults to white
     */
    constructor(public readonly color = Color.white()) { }
}
