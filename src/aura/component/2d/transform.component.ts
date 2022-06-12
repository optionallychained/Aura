import { Mat3 } from '../../math/mat3';
import { Vec2 } from '../../math/vec2';
import { Mutable } from '../../aura.types';
import { Component } from '../component';

/**
 * 2D Transform Component, defining the "physical" attributes of an Entity as well as transformation methods, enabling presence in 2D space
 */
export class Transform extends Component {

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
     * Constructor. Take the initial position, scale, angle and velocity of the Entity and provide the name 'Transform' to the parent class
     *
     * @param initialPosition the 2D position of the Entity
     * @param initialScale the 2D scale of the Entity
     * @param initialAngle the initial rotation of the Entity
     * @param velocity the initial 2D velocity of the Entity
     */
    constructor(
        public readonly initialPosition = new Vec2(),
        public readonly initialScale = new Vec2(1, 1),
        public readonly initialAngle = 0,
        public readonly velocity = new Vec2()
    ) {
        super('Transform');

        this.translate(initialPosition);
        this.scaleTo(initialScale.clone());
        this.rotate(initialAngle);
    }

    /**
     * Move along the right axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveRight(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.right, amount));
    }

    /**
     * Move along the up axis by a given amount (relative to self)
     *
     * @param the amount to move by
     */
    public moveUp(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.up, amount));
    }

    /**
     * Move along both the right and up axes by a given 2D vector (relative to self)
     *
     * @param amounts the 2D vector to move by
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
     * Move by a given translation vector (relative to world axes)
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec2): void {
        this.mutable.position = Vec2.add(this.position, translate);
    }

    /**
     * Rotate by a given angle (radians)
     *
     * @param angle the angle to rotate by
     */
    public rotate(angle: number): void {
        this.mutable.angle += angle;

        const mat = Mat3.fromRotation(angle);

        // adjust the up and right axes according to the rotation
        this.mutable.up = Vec2.normalize(Vec2.transformByMat3(this.up, mat));
        this.mutable.right = Vec2.normalize(Vec2.transformByMat3(this.right, mat));
    }

    /**
     * Scale by a given factor (relative to current scale)
     *
     * @param factor the 2D factor to scale by
     */
    public scaleBy(factor: Vec2): void {
        this.mutable.scale = Vec2.mult(this.scale, factor);
    }

    /**
     * Scale to a given absolute factor
     *
     * @param factor the 2D factor to scale to
     */
    public scaleTo(factor: Vec2): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values
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
        this.scaleTo(this.initialScale.clone());
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
     * Retrieve a Mutable cast of the Transform instance; enables internal-only mutation of translation, rotation and scale
     *
     * @returns the typecasted Mutable Transform instance
     */
    private get mutable(): Mutable<Transform> {
        return this as Mutable<Transform>;
    }
}
