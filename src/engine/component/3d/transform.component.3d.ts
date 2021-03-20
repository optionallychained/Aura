import { Mat4, Vec3 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform3D Component, defining the position, scale, rotation and velocity of a three dimensional Entity
 *
 * Maintains and provides abstractions for a Mat4 transformation matrix
 */
export class Transform3D extends Component {

    /** Maintained translation vector */
    public readonly position: Vec3;

    public readonly forward: Vec3;

    public readonly up: Vec3;

    /** Maintained scale vector */
    public readonly scale: Vec3;

    /** Maintained rotation angles */
    public readonly angles: Vec3;

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

        this.position = initialPosition;
        this.scale = initialScale;
        this.angles = initialAngles;

        this.forward = new Vec3(0, 0, -1);
        this.up = new Vec3(0, 1, 0);

        this.rotateX(initialAngles.x);
        this.rotateY(initialAngles.y);
        this.rotateZ(initialAngles.z);
    }

    public moveForward(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.forward, amount));
    }

    public moveRight(amount: number): void {
        const right = Vec3.normalize(Vec3.cross(this.forward, this.up));

        this.mutable.position = Vec3.add(this.position, Vec3.scale(right, amount));
    }

    public moveUp(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    public rotateX(angle: number): void {
        const right = Vec3.normalize(Vec3.cross(this.forward, this.up));

        const mat = Mat4.fromAxisRotation(right, angle);

        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    public rotateY(angle: number): void {
        const mat = Mat4.fromAxisRotation(this.up, angle);

        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
    }

    public rotateZ(angle: number): void {
        const mat = Mat4.fromAxisRotation(this.forward, angle);

        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    /**
     * Translate the Transform3D by adding the given translation vector to the maintained
     *
     * @param translate the Vec3 to translate by
     */
    public translate(translate: Vec3): void {
        this.mutable.position = Vec3.add(this.position, translate);
    }

    /**
     * Rotate the Transform2D by adding the given angle (radians) to the maintained
     *
     * @param angles the angles (radians) around the x, y and z axes to rotate by, expressed as a Vec3
     */
    public rotate(angles: Vec3): void {
        // this.mutable.angles = Vec3.add(this.angles, angles);
        this.rotateX(angles.x);
        this.rotateY(angles.y);
        this.rotateZ(angles.z);
    }

    /**
     * Scale the Transform3D by a given factor
     *
     * @param factor the Vec3 to scale by
     */
    public scaleBy(factor: Vec3): void {
        this.mutable.scale = Vec3.mult(this.scale, factor);
    }

    /**
     * Set the scale of the Transform3D to a given factor
     *
     * @param factor the Vec3 scale factor to adopt
     */
    public scaleTo(factor: Vec3): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values
     */
    public reset(): void {
        this.mutable.position = this.initialPosition;
        this.mutable.scale = this.initialScale;
        this.mutable.angles = this.initialAngles
    }

    /**
     * Compute the composite Transform Matrix from the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat4 {
        return Mat4.scale(Mat4.lookAt(this.position, Vec3.add(this.position, this.forward), this.up), this.scale);

        // return Mat4.lookAt(this.position, Vec3.add(this.position, this.forward), this.up);


        let compute = Mat4.translate(new Mat4(), this.position);
        compute = Mat4.rotateX(compute, this.angles.x);
        compute = Mat4.rotateY(compute, this.angles.y);
        compute = Mat4.rotateZ(compute, this.angles.z);
        compute = Mat4.scale(compute, this.scale);

        return compute;
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
