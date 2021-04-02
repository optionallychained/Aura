import { Mat4, Vec3 } from '../../math';
import { Component } from '../component';


/**
 * Built-in Transform3D Component, defining the position, scale, rotation and velocity of a three dimensional Entity
 *
 * Maintains and provides abstractions for a Mat4 transformation matrix
 */
export class Transform3D extends Component {

    // track a positional offset, relative to world axes, enabling 'absolute' movement
    public readonly offsetPosition = new Vec3();

    // track position, relative to own axes, enabling 'relative' movement
    public position = new Vec3();

    // track forward vector
    public readonly forward = new Vec3(0, 0, -1);

    // track up vector
    public readonly up = new Vec3(0, 1, 0);

    // track right vector
    public readonly right = new Vec3(1, 0, 0);

    /** Maintained scale vector */
    public readonly scale: Vec3;

    /** Maintained rotation angles */
    public readonly angles = new Vec3();

    public readonly target: Transform3D | undefined;

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

        this.offsetPosition = initialPosition;
        this.scale = initialScale;

        this.rotate(initialAngles);
    }

    // move forward relative to own axes
    public moveForward(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.forward, amount));
    }

    // move right relative to own axes
    public moveRight(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.right, amount));
    }

    // move up relative to own axes
    public moveUp(amount: number): void {
        this.mutable.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    // convenience wrapper for movements
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

    // move relative to world axes
    public translate(translate: Vec3): void {
        this.mutable.offsetPosition = Vec3.add(this.offsetPosition, translate);
    }

    // pitch
    public rotateX(angle: number): void {
        // track the angles
        this.angles.setX(this.angles.x + angle);

        const mat = Mat4.fromAxisRotation(this.right, angle);

        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    // yaw
    public rotateY(angle: number): void {
        this.angles.setY(this.angles.y + angle);

        const mat = Mat4.fromAxisRotation(this.up, angle);

        this.mutable.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.mutable.right = Vec3.normalize(Vec3.transformByMat4(this.right, mat));
    }

    // roll
    public rotateZ(angle: number): void {
        this.angles.setZ(this.angles.z + angle);

        const mat = Mat4.fromAxisRotation(this.forward, angle);

        this.mutable.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
        this.mutable.right = Vec3.normalize(Vec3.transformByMat4(this.right, mat));
    }

    // convenience wrapper for rotation
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

    public lookAt(transform: Transform3D): void {
        this.mutable.target = transform;
    }

    /**
     * Reset all transformations
     */
    public reset(): void {
        // undo the cumulative rotations
        // will implicitly reset forward,up,right back to equivalents post initialAngles rotation
        const invAngles = Vec3.negate(this.angles);
        this.rotate(invAngles);

        // reset position, scale, angles + world offset
        this.mutable.offsetPosition = this.initialPosition;
        this.mutable.scale = this.initialScale;
        this.mutable.angles = this.initialAngles;
        this.mutable.position = new Vec3();
    }

    // using lookAt because it's convenient
    // TODO related to Mat4 lookAt todo...should we really be doing this?
    public compute(): Mat4 {
        const position = Vec3.add(this.position, this.offsetPosition);

        // TODO this does not work
        if (this.target) {
            return Mat4.scale(Mat4.lookAt(position, Vec3.sub(this.target.position, position), this.up), this.scale);
        }

        return Mat4.scale(Mat4.lookAt(position, Vec3.add(position, this.forward), this.up), this.scale);
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
