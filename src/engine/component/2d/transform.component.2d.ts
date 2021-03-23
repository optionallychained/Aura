import { Mat3, Vec2, Vec3 } from '../../math';
import { Component } from '../component';

/**
 * Built-in Transform2D Component, defining the position, scale, rotation and velocity of a two dimensional Entity
 *
 * Maintains and provides abstractions for a Mat3 transformation matrix
 */
export class Transform2D extends Component {

    public readonly offsetPosition = new Vec2();

    public readonly position = new Vec2();

    public readonly up = new Vec2(0, 1);

    public readonly right = new Vec2(1, 0);

    public readonly scale = new Vec2();

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

        this.offsetPosition = initialPosition;
        this.scale = initialScale;
        this.angle = initialAngle;
    }

    public moveRight(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.right, amount));
    }

    public moveUp(amount: number): void {
        this.mutable.position = Vec2.add(this.position, Vec2.scale(this.up, amount));
    }

    public move(amounts: Vec2): void {
        if (amounts.x) {
            this.moveRight(amounts.x);
        }

        if (amounts.y) {
            this.moveUp(amounts.y);
        }
    }

    public translate(translate: Vec2): void {
        this.mutable.offsetPosition = Vec2.add(this.offsetPosition, translate);
    }

    public rotate(angle: number): void {
        this.mutable.angle += angle;

        const mat = Mat3.fromRotation(angle);

        this.mutable.up = Vec2.normalize(Vec2.transformByMat3(this.up, mat));
        this.mutable.right = Vec2.normalize(Vec2.transformByMat3(this.right, mat));
    }

    /**
     * Scale the Transform2D by a given factor
     *
     * @param factor the Vec2 to scale by
     */
    public scaleBy(factor: Vec2): void {
        this.mutable.scale = Vec2.mult(this.scale, factor);
    }

    /**
     * Set the scale of the Transform2D to a given factor
     *
     * @param factor the Vec2 scale factor to adopt
     */
    public scaleTo(factor: Vec2): void {
        this.mutable.scale = factor;
    }

    /**
     * Reset all transformations back to their initial values
     */
    public reset(): void {
        this.mutable.angle = this.initialAngle;
        this.mutable.offsetPosition = this.initialPosition;
        this.mutable.scale = this.initialScale;
        this.mutable.position = new Vec2();
    }

    /**
     * Compute the composite Transform Matrix from the maintained translation, scaling and rotation
     *
     * @returns the Transform matrix
     */
    public compute(): Mat3 {
        const position = Vec2.add(this.position, this.offsetPosition);

        let compute = Mat3.translate(new Mat3(), position);
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
