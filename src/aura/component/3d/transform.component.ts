import { Mat4 } from '../../math/mat4';
import { Vec3 } from '../../math/vec3';
import { Mutable } from '../../aura.types';
import { Component } from '../component';
import { Name } from '../../core/name.decorator';

/**
 * 3D Transform Component, defining the "physical" attributes of an Entity as well as transformation methods, enabling presence in 3D space
 */
@Name('Transform')
export class Transform extends Component {

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
     * Constructor. Take the initial position, scale, angles and velocity of the Entity and provide the name 'Transform' to the parent class
     *
     * @param initialPosition the 3D position of the Entity
     * @param initialScale the 3D scale of the Entity
     * @param initialAngle the initial 3D rotations of the Entity
     * @param velocity the initial 3D velocity of the Entity
     */
    constructor(
        public readonly initialPosition = new Vec3(),
        public readonly initialScale = new Vec3(1, 1, 1),
        public readonly initialAngles = new Vec3(),
        public readonly velocity = new Vec3()
    ) {
        super('Transform');

        this.translate(initialPosition);
        this.scaleTo(initialScale);
        this.rotate(initialAngles);
    }

    /**
     * Move along the right axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveRight(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.right, amount));
    }

    /**
     * Move along the up axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveUp(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    /**
     * Move along the forward axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveForward(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.forward, amount));
    }

    /**
     * Move along all three axes by a given 3D vector (relative to self)
     *
     * @param amounts the 3D vector to move by
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
     * Move by a given translation vector (relative to world axes)
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec3): void {
        this.mutable.position = Vec3.add(this.position, translate);
    }

    /**
     * Rotate by a given angle (radians) around the X axis; pitch
     *
     * @param angle the angle to rotate by
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
     * @param angle the angle to rotate by
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
     * @param angle the angle to rotate by
     */
    public rotateZ(angle: number): void {
        this.angles.setZ(this.angles.z + angle);

        const mat = Mat4.fromAxisRotation(this.forward, angle);

        // adjust the up and right axes according to the rotation
        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
        this.mutable.right = Vec3.normalize(Vec3.transformByMat4(this.right, mat));
    }

    /**
     * Rotate around all three axes by 3 given angles (radians)
     *
     * @param angles the X, Y and Z angles to rotate by
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
     * Scale by a given factor (relative to current scale)
     *
     * @param factor the 3D factor to scale by
     */
    public scaleBy(factor: Vec3): void {
        this.mutable.scale = Vec3.mult(this.scale, factor);
    }

    /**
     * Scale to a given absolute factor
     *
     * @param factor the 3D factor to scale to
     */
    public scaleTo(factor: Vec3): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values
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
     * Retrieve a Mutable cast of the Transform instance; enables internal-only mutation of translation, rotation and scale
     *
     * @returns the typecasted Mutable Transform instance
     */
    private get mutable(): Mutable<Transform> {
        return this as Mutable<Transform>;
    }
}
