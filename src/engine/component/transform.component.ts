import { Mat3, Vec2 } from '../math';
import { Component } from './component';

/**
 * Built-in Transform Component, defining the position, dimensions and velocity of an Entity
 *
 * Maintains and provides abstractions for a Mat3 transform
 */
export class Transform extends Component {

    /** Transform Matrix for representing Entity transformations */
    public readonly transform = new Mat3();

    /** Vec2 representing the center of the Entity, calculated by its position and dimensions */
    public readonly center: Vec2;

    /**
     * Constructor. Take and store the position, dimensions and velocity, and provide the name 'Transform' to the parent class
     *
     * @param position the position of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param dimensions the dimensions of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param velocity the velocity of the Entity, expressed as a Vec2. Defaults to 0,0
     */
    constructor(public readonly position = new Vec2(), public readonly dimensions = new Vec2(), public readonly velocity = new Vec2()) {
        super('Transform');

        this.center = new Vec2(position.x + (dimensions.x / 2), position.y + (dimensions.y / 2));
    }

    /**
     * Abstraction for Mat3.translate, translating the transform matrix by the given vector
     *
     * @param translate the Vec2 to translate by
     */
    public translate(translate: Vec2): void {
        this.mutable.transform = Mat3.translate(this.transform, translate);
    }

    /**
     * Abstraction for Mat3.rotate, rotating the transform matrix by the given angle (radians)
     *
     * @param angle the angle to rotate by
     */
    public rotate(angle: number): void {
        this.mutable.transform = Mat3.rotate(this.transform, angle);
    }

    /**
     * Abstraction for Mat3.scale, scaling the transform matrix by the given Vec2 factor
     *
     * @param factor the factor to scale by
     */
    public scale(factor: Vec2): void {
        this.mutable.transform = Mat3.scale(this.transform, factor);
    }

    /**
     * Getter for a Mutable cast of the Transform instance; used for enabling internal-only mutation in the transform abstractions
     *
     * @returns the typecasted Mutable Transform instance
     */
    private get mutable(): Mutable<Transform> {
        return this as Mutable<Transform>;
    }
}
