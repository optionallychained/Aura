import { Mat3, Vec2 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform2D Component, defining the position, scale, rotation and velocity of a two dimensional Entity
 *
 * Maintains and provides abstractions for a Mat3 transformation matrix
 */
export class Transform2D extends Component {

    /** Maintained translation vector */
    public readonly position: Vec2;

    /** Maintained scale vector */
    public readonly scale: Vec2;

    /** Maintained rotation angle */
    public readonly angle: number;

    /**
     * Constructor. Take and store the initial position, scale, angle and velocity
     *
     * @param initialPosition the position of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param initialScale the starting scale of the Entity, expressed as a Vec2. Defaults to 1,1
     * @param initialAngle the starting rotation of the Entity. Defaults to 0
     * @param velocity the velocity of the Entity, expressed as a Vec2. Defaults to 0,0
     */
    constructor(
        public readonly initialPosition = new Vec2(),
        public readonly initialScale = new Vec2(1, 1),
        public readonly initialAngle = 0,
        public readonly velocity = new Vec2()
    ) {

        super('Transform2D');

        this.position = initialPosition;
        this.scale = initialScale;
        this.angle = initialAngle;
    }

    /**
     * Translate the Transform2D by adding the given translation vector to the maintained
     *
     * @param translate the Vec2 to translate by
     */
    public translate(translate: Vec2): void {
        this.mutable.position = Vec2.add(this.position, translate);
    }

    /**
     * Rotate the Transform2D by adding the given angle (radians) to the maintained
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotate(angle: number): void {
        this.mutable.angle += angle;
    }

    /**
     * Scale the Transform2D by a given factor
     *
     * @param factor the Vec2 to scale by
     */
    public scaleBy(factor: Vec2): void {
        this.mutable.scale = Vec2.mult(this.scale, factor);
    }

    /**
     * Set the scale of the Transform2D to a given factor
     *
     * @param factor the Vec2 scale factor to adopt
     */
    public scaleTo(factor: Vec2): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values
     */
    public reset(): void {
        this.mutable.position = this.initialPosition;
        this.mutable.scale = this.initialScale;
        this.mutable.angle = this.initialAngle;
    }

    /**
     * Compute the composite Transform Matrix from the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat3 {
        let compute = Mat3.translate(new Mat3(), this.position);
        compute = Mat3.rotate(compute, this.angle);
        compute = Mat3.scale(compute, this.scale);

        return compute;
    }

    /**
     * Getter for a Mutable cast of the Transform2D instance; used for enabling internal-only mutation of translation, rotation and scale
     *
     * @returns the typecasted Mutable Transform2D instance
     */
    private get mutable(): Mutable<Transform2D> {
        return this as Mutable<Transform2D>;
    }
}
