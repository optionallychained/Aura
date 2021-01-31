import { Vec2 } from './vec2';

/**
 * Class representing a 3x3 Matrix and providing static utilities for mathematical operations
 */
export class Mat3 {

    /**
     * Internally-referenced static identity matrix
     */
    private static readonly IDENTITY = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    /**
     * Add two Mat3s
     *
     * @param left the first Mat3
     * @param right the second Mat3
     *
     * @returns the result of the addition
     */
    public static add(left: Mat3, right: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Subtract the right Mat3 from the left
     *
     * @param left the Mat3 to subtract from
     * @param right the Mat3 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Mat3, right: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Multiply two Mat3s
     *
     * @param left the first Mat3
     * @param right the second Mat3
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Mat3, right: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Divide the left Mat3 by the right
     *
     * @param left the Mat3 to divide
     * @param right the Mat3 to divide by
     *
     * @returns the result of the division
     */
    public static div(left: Mat3, right: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Scale a Mat3 by factors on the x and y axes, given as a Vec2
     *
     * @param m the Mat3 to scale
     * @param factor the axis factors to scale by
     *
     * @returns the scaled Mat3
     */
    public static scale(m: Mat3, factor: Vec2): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Invert a Mat3
     *
     * @param m the Mat3 to invert
     *
     * @returns the inverse of the Mat3
     */
    public static invert(m: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Transpose a Mat3
     *
     * @param m the Mat3 to transpose
     *
     * @return the transposed Mat3
     */
    public static transpose(m: Mat3): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Translate a Mat3 by a Vec2 along the x and y
     *
     * @param m the Mat3 to translate
     * @param translate the translation vector
     *
     * @returns the translated Mat3
     */
    public static translate(m: Mat3, translate: Vec2): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Rotate a Mat3 by angles (radians) by a given angle (radians)
     *
     * @param m the Mat3 to rotate
     * @param angle the angle to rotate by
     *
     * @returns the rotated Mat3
     */
    public static rotate(m: Mat3, angle: number): Mat3 {
        throw Error('Method not implemented');
    }

    /**
     * Constructor. Take and store the Mat3's values
     *
     * @param values the Mat3's values; defaults to Mat3.IDENTITY
     */
    constructor(private readonly values: Array<number> = Mat3.IDENTITY.slice(0)) { }

    /**
     * Getter for the Mat3's determinant
     */
    public get determinant(): number {
        throw Error('Method not implemented');
    }

    /**
     * Getter for the Array form of the Mat3
     */
    public get array(): Array<number> {
        return this.values;
    }

    /**
     * Getter for the Float32Array form of the Mat3
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Mat3
     */
    public get string(): string {
        const v = this.values;

        return `Mat3(${v[0]},${v[1]},${v[2]},
                     ${v[3]},${v[4]},${v[5]},
                     ${v[6]},${v[7]},${v[8]}
                )`;
    }

    /**
     * Reset the Mat3's values to match the identity matrix
     */
    public reset(): void {
        // TODO hmmmm
        this.mutable.array = Mat3.IDENTITY.slice(0);
    }

    /**
     * Clone the Mat3
     *
     * @returns a new Mat3 with the same values as this one
     */
    public clone(): Mat3 {
        // TODO test whether or not the slice is necessary here
        return new Mat3(this.values.slice(0));
    }

    /**
     * Getter for a Mutable cast of the Mat3 instance; used for enabling internal-only mutation
     *
     * @returns the typecasted Mutable Mat3 instance
     */
    private get mutable(): Mutable<Mat3> {
        return this as Mutable<Mat3>;
    }
}
