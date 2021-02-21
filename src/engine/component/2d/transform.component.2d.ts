import { Mat3, Vec2 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform2D Component, defining the position, scale, rotation and velocity of a two dimensional Entity
 *
 * Maintains and provides abstractions for a Mat3 transformations matrix
 */
export class Transform2D extends Component {

    /** Maintained scale vector */
    private scaleVector: Vec2;

    /** Maintained translation vector */
    private translationVector: Vec2;

    /** Maintained rotation angle in radians */
    private rotation = 0;

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

        this.translationVector = initialPosition;
        this.scaleVector = initialScale;
        this.rotation = initialAngle;
    }

    /**
     * Abstraction for Mat3.translate, adding a given translation onto the existing translationVector
     *
     * @param translate the Vec2 to translate by
     */
    public translate(translate: Vec2): void {
        this.translationVector = Vec2.add(this.translationVector, translate);
    }

    /**
     * Abstraction for Mat3.rotate, adding a given angle (in radians) to the current rotation angle
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotate(angle: number): void {
        this.rotation += angle;
    }

    /**
     * Abstraction for Mat3.scale, updating the existing scale factor with the given
     *
     * Multiplies the two Vec2s so as to ensure an Entity's initialScale is preserved as the baseline
     *
     * @param factor the factor to scale by
     */
    public scale(factor: Vec2): void {
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
