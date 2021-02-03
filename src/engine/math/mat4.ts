import { Vec3 } from './vec3';

/**
 * Class representing a 4x4 Matrix and providing static utilities for mathematical operations
 */
export class Mat4 {

    /**
     * Internally-referenced static identity matrix
     */
    private static readonly IDENTITY = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    /**
     * Add two Mat4s
     *
     * @param left the first Mat4
     * @param right the second Mat4
     *
     * @returns the result of the addition
     */
    public static add(left: Mat4, right: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Subtract the right Mat4 from the left
     *
     * @param left the Mat4 to subtract from
     * @param right the Mat4 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Mat4, right: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Multiply two Mat4s
     *
     * @param left the first Mat4
     * @param right the second Mat4
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Mat4, right: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Divide the left Mat4 by the right
     *
     * @param left the Mat4 to divide
     * @param right the Mat4 to divide by
     *
     * @returns the result of the division
     */
    public static div(left: Mat4, right: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Scale a Mat4 by factors on the x, y and z axes, given as a Vec3
     *
     * @param m the Mat4 to scale
     * @param factor the axis factors to scale by
     *
     * @returns the scaled Mat4
     */
    public static scale(m: Mat4, factor: Vec3): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Invert a Mat4
     *
     * @param m the Mat4 to invert
     *
     * @returns the inverse of the Mat4
     */
    public static invert(m: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Transpose a Mat4
     *
     * @param m the Mat4 to transpose
     *
     * @return the transposed Mat4
     */
    public static transpose(m: Mat4): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Translate a Mat4 by a Vec3 along the x, y and z axes
     *
     * @param m the Mat4 to translate
     * @param translate the translation vector
     *
     * @returns the translated Mat4
     */
    public static translate(m: Mat4, translate: Vec3): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Rotate a Mat4 by angles (radians) around the x, y and z axes, given as a Vec3
     *
     * @param m the Mat4 to rotate
     * @param axisVector the rotation vector
     *
     * @returns the rotated Mat4
     */
    public static rotate(m: Mat4, axisVector: Vec3): Mat4 {
        throw Error('Method not implemented');
    }

    /**
     * Constructor. Take and store the Mat4's values
     *
     * @param values the Mat4's values; defaults to Mat4.IDENTITY
     */
    constructor(private readonly values: Array<number> = Mat4.IDENTITY.slice(0)) { }

    /**
     * Getter for the Mat4's determinant
     */
    public get determinant(): number {
        throw Error('Method not implemented');
    }

    /**
     * Getter for the Mat4's forward vector
     */
    public get forwardVector(): Vec3 {
        return new Vec3(this.values[8], this.values[9], this.values[10]);
    }

    /**
     * Getter for the Mat4's forward vector
     */
    public get rightVector(): Vec3 {
        return new Vec3(this.values[0], this.values[1], this.values[2]);
    }

    /**
     * Getter for the Mat4's up vector
     */
    public get upVector(): Vec3 {
        return new Vec3(this.values[4], this.values[5], this.values[6]);
    }

    /**
     * Getter for the Array form of the Mat4
     */
    public get array(): Array<number> {
        return this.values;
    }

    /**
     * Getter for the Float32Array form of the Mat4
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Mat4
     */
    public get string(): string {
        const v = this.values;

        return `Mat4( ${v[0]} , ${v[1]} , ${v[2]} , ${v[3]} ,
                      ${v[4]} , ${v[5]} , ${v[6]} , ${v[7]} ,
                      ${v[8]} , ${v[9]} , ${v[10]} , ${v[11]}
                )`;
    }

    /**
     * Reset the Mat4's values to match the identity matrix
     */
    public reset(): void {
        // TODO hmmmm
        this.mutable.array = Mat4.IDENTITY.slice(0);
    }

    /**
     * Clone the Mat4
     *
     * @returns a new Mat4 with the same values as this one
     */
    public clone(): Mat4 {
        // TODO test whether or not the slice is necessary here
        return new Mat4(this.values.slice(0));
    }

    /**
     * Getter for a Mutable cast of the Mat4 instance; used for enabling internal-only mutation
     *
     * @returns the typecasted Mutable Mat4 instance
     */
    private get mutable(): Mutable<Mat4> {
        return this as Mutable<Mat4>;
    }
}
