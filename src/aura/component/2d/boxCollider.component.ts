import { Vec2 } from '../../math/vec2';
import { Component } from '../component';
import { Name } from '../../core/name.decorator';

/**
 * 2D BoxCollider Component, defining an AABB of a given size for the Entity
 */
@Name('BoxCollider')
export class BoxCollider extends Component {

    /**
     * Constructor. Take the box dimensions and provide the name 'BoxCollider' to the parent class
     *
     * If no dimensions are provided, the Collision System will use the Entity's own dimensions instead
     *
     * @param dimensions optional box dimensions
     */
    constructor(public readonly dimensions?: Vec2) {
        super('BoxCollider');
    }
}
