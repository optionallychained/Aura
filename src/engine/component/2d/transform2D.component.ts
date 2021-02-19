import { Mat3, Vec2 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform2D Component, defining the position, dimensions and velocity of an Entity
 *
 * Maintains and provides abstractions for a Mat3 Transform2D
 */
export class Transform2D extends Component {

    /** Maintained scale vector */
    private scaleVector: Vec2;

    /** maintained translation vector */
    private translationVector: Vec2;

    /** maintained rotation angle in radians */
    private rotation = 0;

    /** Vec2 representing the center of the Entity, calculated by its position and dimensions */
    // public readonly center: Vec2;

    /**
     * Constructor. Take and store the position, dimensions and velocity, and provide the name 'Transform2D' to the parent class
     *
     * @param position the position of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param dimensions the dimensions of the Entity, expressed as a Vec2. Defaults to 0,0
     * @param velocity the velocity of the Entity, expressed as a Vec2. Defaults to 0,0
     */
    constructor(
        public readonly initialPosition = new Vec2(),
        public readonly initialScale = new Vec2(1, 1),
        public readonly initialAngle = 0,
        public readonly velocity = new Vec2()
    ) {

        super('Transform2D');

        this.translationVector = initialPosition;
        this.scaleVector = initialScale;
        this.rotation = initialAngle;
    }

    /**
     * Abstraction for Mat3.translate, translating the transform matrix by the given vector
     *
     * @param translate the Vec2 to translate by
     */
    public translate(translate: Vec2): void {
        this.translationVector = Vec2.add(this.translationVector, translate);
    }

    /**
     * Abstraction for Mat3.rotate, rotating the transform matrix by the given angle (radians)
     *
     * @param angle the angle to rotate by
     */
    public rotate(angle: number): void {
        this.rotation += angle;
    }

    /**
     * Abstraction for Mat3.scale, scaling the transform matrix by the given Vec2 factor
     *
     * @param factor the factor to scale by
     */
    public scale(factor: Vec2): void {
        // maintain the initial scale by making all subsequent scales a factor of the initial
        this.scaleVector = Vec2.mult(this.initialScale, factor);
    }

    /**
     * Compute the composite Transform Matrix for the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat3 {
        const trans = Mat3.translate(new Mat3(), this.translationVector);
        const rot = Mat3.rotate(new Mat3(), this.rotation);
        const scale = Mat3.scale(new Mat3(), this.scaleVector);

        let compute = Mat3.mult(new Mat3(), scale);
        compute = Mat3.mult(compute, rot);
        compute = Mat3.mult(compute, trans);

        return compute;
    }
}
