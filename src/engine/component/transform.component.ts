import { Mat3, Vec2 } from '../math';
import { Component } from './component';

/**
 * Built-in Transform Component, defining the position, dimensions and velocity of an Entity.
 *
 * Utilised by the built-in PhysicsSystem to enable the placement and movement of Entities within the game
 *
 * @see PhysicsSystem
 */
export class Transform extends Component {

    /** Transform Matrix for representing Entity transformations */
    public transform = new Mat3();

    /**
     * Constructor. Take and store the position, dimensions and velocity, and provide the name 'Transform' to the parent class
     *
     * @param position the position of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param dimensions the dimensions of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param velocity the velocity of the Entity, expressed as a Vec2. Defaults to 0,0
     */
    constructor(public position = new Vec2(), public dimensions = new Vec2(), public velocity = new Vec2()) {
        super('Transform');
    }
}
