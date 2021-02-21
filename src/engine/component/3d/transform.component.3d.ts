import { Mat4, Vec3 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform3D Component, defining the position, scale, rotation and velocity of a three dimensional Entity
 *
 * Maintains and provides abstractions for a Mat4 transformations matrix
 */
export class Transform3D extends Component {

    /** Maintined scale vector */
    private scaleVector: Vec3;

    /** Maintained translation vector */
    private translationVector: Vec3;

    /** Maintained rotation vector (around the x, y, and z axes) in radians */
    private rotation: Vec3;

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
        public readonly initialRotation = new Vec3(),
        public readonly velocity = new Vec3()
    ) {

        super('Transform3D');

        this.translationVector = initialPosition;
        this.scaleVector = initialScale;
        this.rotation = initialRotation;
    }

    /**
     * Abstraction for Mat4.translate, adding a given translation onto the existing translationVector
     *
     * @param translate the Vec4 to translate by
     */
    public translate(translate: Vec3): void {
        this.translationVector = Vec3.add(this.translationVector, translate);
    }

    /**
     * Abstraction for Mat4.rotate, adding a given angle (in radians) to the current rotation angle
     *
     * @param angle the angles around the x, y and z axes (radians) to rotate by, expressed as a Vec3
     */
    public rotate(factor: Vec3): void {
        this.rotation = Vec3.add(this.rotation, factor);
    }

    /**
     * Abstraction for Mat4.scale, updating the existing scale factor with the given
     *
     * Multiplies the two Vec4s so as to ensure an Entity's initialScale is preserved as the baseline
     *
     * @param factor the factor to scale by
     */
    public scale(factor: Vec3): void {
        this.scaleVector = Vec3.mult(this.initialScale, factor);
    }

    /**
     * Compute the composite Transform Matrix for the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat4 {
        const trans = Mat4.translate(new Mat4(), this.translationVector);

        const rotX = Mat4.rotateX(new Mat4(), this.rotation.x);
        const rotY = Mat4.rotateY(new Mat4(), this.rotation.y);
        const rotZ = Mat4.rotateZ(new Mat4(), this.rotation.z);

        let rot = Mat4.mult(new Mat4(), rotX);
        rot = Mat4.mult(rot, rotY);
        rot = Mat4.mult(rot, rotZ);

        const scale = Mat4.scale(new Mat4(), this.scaleVector);

        let compute = Mat4.mult(new Mat4(), scale);
        compute = Mat4.mult(compute, rot);
        compute = Mat4.mult(compute, trans);

        return compute;
    }
}
