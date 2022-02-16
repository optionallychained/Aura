import { Mat4, Vec3 } from '../../math';
import { Mutable } from '../../types';
import { Component } from '../component';

/**
 * Built-in Transform3D Component, defining the position, scale, rotation and velocity of a three dimensional Entity
 *
 * Provides for both relative movement along own axes as well as absolute movement along the world axes
 *
 * Produces the Mat4 Transformation Matrix used in shaders to position Game Objects
 */
export class Transform3D extends Component {

    /** Maintained position */
    public readonly position = new Vec3();

    /** Maintained 'forward' Axis */
    public readonly forward = new Vec3(0, 0, -1);

    /** Maintained 'up' Axis */
    public readonly up = new Vec3(0, 1, 0);

    /** Maintained 'right' Axis */
    public readonly right = new Vec3(1, 0, 0);

    /** Maintained scale factor */
    public readonly scale = new Vec3(1, 1, 1);

    /** Maintained rotation angles (radians) */
    public readonly angles = new Vec3();

    /**
     * Constructor. Take and store the initial position, scale, angle and velocity
     *
     * @param initialPosition the position of the Entity, expressed as a Vec3. Defaults to 0,0,0
     * @param initialScale the starting scale of the Entity, expressed as a Vec3. Defaults to 1,1,1
     * @param initialAngle the starting rotation around the x, y and z axes of the Entity. Defaults to 0,0,0
     * @param velocity the velocity of the Entity, expressed as a Vec3. Defaults to 0,0,0
     */
    constructor(
        public readonly initialPosition = new Vec3(),
        public readonly initialScale = new Vec3(1, 1, 1),
        public readonly initialAngles = new Vec3(),
        public readonly velocity = new Vec3()
    ) {

        super('Transform3D');

        this.translate(initialPosition);
        this.scaleTo(initialScale);
        this.rotate(initialAngles);
    }

    /**
     * Move along the right axis by a given amount
     *
     * Facilitates relative movement
     *
     * @param amount the amount to move by
     */
    public moveRight(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.right, amount));
    }

    /**
     * Move along the up axis by a given amount
     *
     * Facilitates relative movement
     *
     * @param amount the amount to move by
     */
    public moveUp(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    /**
     * Move along the forward axis by a given amount
     *
     * Facilitates relative movement
     *
     * @param amount the amount to move by
     */
    public moveForward(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.forward, amount));
    }

    /**
     * Convenience wrapper for moveRight(), moveUp() and moveForward(), taking a Vec3 to represent the Right, Up and Forward amounts
     *
     * @param amounts the Right, Up and Forward amounts to move by
     */
    public move(amounts: Vec3): void {
        if (amounts.x) {
            this.moveRight(amounts.x);
        }

        if (amounts.y) {
            this.moveUp(amounts.y);
        }

        if (amounts.z) {
            this.moveForward(amounts.z);
        }
    }

    /**
     * Move along the World axes by a given translation vector
     *
     * Facilitates absolute movement
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec3): void {
        this.mutable.position = Vec3.add(this.position, translate);
    }

    /**
     * Rotate by a given angle (radians) around the X axis; pitch
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateX(angle: number): void {
        this.angles.setX(this.angles.x + angle);

        const mat = Mat4.fromAxisRotation(this.right, angle);

        // adjust the forward and up axes according to the rotation
        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    /**
     * Rotate by a given angle (radians) around the Y axis; yaw
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateY(angle: number): void {
        this.angles.setY(this.angles.y + angle);

        const mat = Mat4.fromAxisRotation(this.up, angle);

        // adjust the forward and right axes according to the rotation
        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.mutable.right = Vec3.normalize(Vec3.transformByMat4(this.right, mat));
    }

    /**
     * Rotate by a given angle (radians) around the Z axis; roll
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateZ(angle: number): void {
        this.angles.setZ(this.angles.z + angle);

        const mat = Mat4.fromAxisRotation(this.forward, angle);

        // adjust the up and right axes according to the rotation
        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
        this.mutable.right = Vec3.normalize(Vec3.transformByMat4(this.right, mat));
    }

    /**
     * Convenience wrapper for rotateX(), rotateY() and rotateZ(), taking a Vec3 representing the X, Y and Z angles (radians) to rotate by
     *
     * @param angles the X, Y and Z angles (radians) to rotate by
     */
    public rotate(angles: Vec3): void {
        if (angles.x) {
            this.rotateX(angles.x);
        }

        if (angles.y) {
            this.rotateY(angles.y);
        }

        if (angles.z) {
            this.rotateZ(angles.z);
        }
    }

    /**
     * Scale the Transform3D by a given factor, relative to its current scale
     *
     * @param factor the Vec3 to scale by
     */
    public scaleBy(factor: Vec3): void {
        this.mutable.scale = Vec3.mult(this.scale, factor);
    }

    /**
     * Scale the Transform3D to a given absolute factor
     *
     * @param factor the Vec3 scale factor to adopt
     */
    public scaleTo(factor: Vec3): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values, including the Transform's axes
     */
    public reset(): void {
        // reset the axes
        this.mutable.right = new Vec3(1, 0, 0);
        this.mutable.up = new Vec3(0, 1, 0);
        this.mutable.forward = new Vec3(0, 0, 1);

        // reset all transformation members
        this.mutable.angles = new Vec3();
        this.mutable.position = new Vec3();
        this.mutable.scale = new Vec3(1, 1, 1);

        // retread the construction transformation to reconfigure
        this.translate(this.initialPosition);
        this.scaleTo(this.initialScale);
        this.rotate(this.initialAngles);
    }

    /**
     * Compute the composite Transform Matrix from the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat4 {
        // using a lookAt Matrix because it's convenient for orientation
        return Mat4.scale(Mat4.lookAt(this.position, Vec3.add(this.position, this.forward), this.up), this.scale);
    }

    /**
    * Getter for a Mutable cast of the Transform3D instance; used for enabling internal-only mutation of translation, rotation and scale
    *
    * @returns the typecasted Mutable Transform3D instance
    */
    private get mutable(): Mutable<Transform3D> {
        return this as Mutable<Transform3D>;
    }
}
