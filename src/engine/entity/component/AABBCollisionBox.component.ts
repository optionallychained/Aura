import { Game } from '../../core/game';
import { Vec2 } from '../../math/vec2';
import { Entity } from '../entity';
import { Component } from './component';

/**
 * Built-in Collision Box Component, defining a bounding box of a given size and with a given collision handling function.
 *
 * Utilised by the built-in CollisionSystem
 *
 * @see CollisionSystem
 */
export class AABBCollisionBox extends Component {

    /**
     * Constructor. Take and store the box's dimensions and collision handling function, and provide the name 'AABBCollisionBox' to the parent class
     *
     * @param dimensions the dimensions of this collision box, expressed as a Vec2
     * @param onCollision the collision handling method, executed when a collision is detected, receiving the Game instance and the other Entity
     */
    constructor(public dimensions = new Vec2(), public onCollision: (game: Game, other: Entity) => void) {
        super('AABBCollisionBox');
    }
}
