import { Mat3 } from '../../math/mat3';
import { Vec2 } from '../../math/vec2';
import { Mutable } from '../../types';
import { Component } from '../component';

/**
 * Built-in Transform2D Component, defining the position, scale, rotation and velocity of a two dimensional Entity
 *
 * Provides for both relative movement along own axes as well as absolute movement along the world axes
 *
 * Produces the Mat3 Transformation Matrix used in shaders to position Game Objects
 */
export class Transform2D extends Component {

    /** Maintained position */
    public readonly position = new Vec2();

    /** Maintained 'up' Axis */
    public readonly up = new Vec2(0, 1);

    /** Maintained 'right' Axis */
    public readonly right = new Vec2(1, 0);

    /** Maintained scale factor */
    public readonly scale = new Vec2(1, 1);

    /** Maintained rotation angle (radians) */
    public readonly angle: number = 0;

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

        this.translate(initialPosition);
        this.scaleTo(initialScale);
        this.rotate(initialAngle);
    }

    /**
     * Move along the right axis by a given amount
     *
     * Facilitates relative movement
     *
     * @param amount the amount to move by
     */
    public moveRight(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.right, amount));
    }

    /**
     * Move along the up axis by a given amount
     *
     * Facilitates relative movement
     *
     * @param the amount to move by
     */
    public moveUp(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.up, amount));
    }

    /**
     * Convenience wrapper for moveRight() and moveUp(), taking a Vec2 to represent the Right and Up amounts
     *
     * @param amounts the Right and Up amounts to move by
     */
    public move(amounts: Vec2): void {
        if (amounts.x) {
            this.moveRight(amounts.x);
        }

        if (amounts.y) {
            this.moveUp(amounts.y);
        }
    }

    /**
     * Move along the World axes by a given translation vector
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec2): void {
        this.mutable.position = Vec2.add(this.position, translate);
    }

    /**
     * Rotate by a given angle (radians)
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotate(angle: number): void {
        this.mutable.angle += angle;

        const mat = Mat3.fromRotation(angle);

        // adjust the up and right axes according to the rotation
        this.mutable.up = Vec2.normalize(Vec2.transformByMat3(this.up, mat));
        this.mutable.right = Vec2.normalize(Vec2.transformByMat3(this.right, mat));
    }

    /**
     * Scale the Transform2D by a given factor, relative to its current scale
     *
     * @param factor the Vec2 to scale by
     */
    public scaleBy(factor: Vec2): void {
        this.mutable.scale = Vec2.mult(this.scale, factor);
    }

    /**
     * Scale the Transform2D to a given absolute factor
     *
     * @param factor the Vec2 scale factor to adopt
     */
    public scaleTo(factor: Vec2): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values, including the Transform's axes
     */
    public reset(): void {
        // reset the axes
        this.mutable.right = new Vec2(1, 0);
        this.mutable.up = new Vec2(0, 1);

        // reset all transformation members
        this.mutable.angle = 0;
        this.mutable.position = new Vec2();
        this.mutable.scale = new Vec2(1, 1);

        // retread the construction transformation to reconfigure
        this.translate(this.initialPosition);
        this.scaleTo(this.initialScale);
        this.rotate(this.initialAngle);
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
