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
    }

    /**
    * Abstraction for Mat4.translate, translating the maintained translationMatrix with the given translation
    *
    * @param translate the Vec3 to translate by
    */
    public translate(translate: Vec3): void {
        this.mutable.position = Vec3.add(this.position, translate);
    }

    /**
     * Abstraction for Mat4.rotate, rotating the maintained rotationMatrix by the given angle (radians)
     *
     * @param angles the angles (radians) around the x, y and z axes to rotate by, expressed as a Vec3
     */
    public rotate(angles: Vec3): void {
        this.mutable.angles = Vec3.add(this.angles, angles);
    }

    /**
     * Abstraction for Mat4.scale, scaling the maintained scaleMatrix by the given factor
     *
     * @param factor the Vec3 to scale by
     */
    public scaleBy(factor: Vec3): void {
        this.mutable.scale = Vec3.mult(this.scale, factor);
    }

    public scaleTo(factor: Vec3): void {
        this.mutable.scale = factor;
    }

    /**
     * Compute the composite Transform Matrix for the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat4 {
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
