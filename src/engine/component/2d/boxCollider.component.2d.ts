import { Game } from '../../core';
import { Entity } from '../../entity';
import { Vec2 } from '../../math';
import { Component } from '../component';

/**
 * Built-in 2D Collision Box Component, defining an AABB of a given size and with a given collision handling method
 */
export class BoxCollider2D extends Component {

    /**
     * Constructor. Take and store the box's dimensions and collision handling function, and provide the name 'BoxCollider2D' to the
     *   parent class
     *
     * @param dimensions the dimensions of this collision box, expressed as a Vec2
     * @param onCollision the collision handling method, receiving the Game instance and the other Entity
     */
    constructor(public dimensions = new Vec2(), public onCollision: (game: Game, other: Entity) => void) {
        super('BoxCollider2D');
    }
}
