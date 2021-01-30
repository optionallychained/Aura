/**
 * Class representing a four-dimensional Vector with properties x, y, z and w and providing static utilities for mathematical operations
 */
export class Vec4 {

    /**
     * Add two Vec4s
     *
     * @param left the first vec4
     * @param right the second Vec4
     *
     * @returns the result of the addition
     */
    public static add(left: Vec4, right: Vec4): Vec4 {
        return new Vec4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
    }

    /**
     * Subtract the right Vec4 from the left
     *
     * @param left the Vec4 to subtract from
     * @param right the Vec4 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Vec4, right: Vec4): Vec4 {
        return new Vec4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
    }

    /**
     * Multiply two Vec4s
     *
     * @param left the first Vec4
     * @param right the second Vec4
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Vec4, right: Vec4): Vec4 {
        return new Vec4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
    }

    /**
     * Divide the left Vec4 by the right
     *
     * @param left the Vec4 to divide
     * @param right the Vec4 to divide by
     *
     * @returns the result of the division
     */
    public static div(left: Vec4, right: Vec4): Vec4 {
        return new Vec4(left.x / right.x, left.y / right.y, left.z / right.z, left.w / right.w);
    }

    /**
     * Scale a Vec4 by a given factor
     *
     * @param v the Vec4 to scale
     * @param factor the factor to scale by
     *
     * @returns the scalec Vec4
     */
    public static scale(v: Vec4, factor: number): Vec4 {
        return new Vec4(v.x * factor, v.y * factor, v.z * factor, v.w * factor);
    }

    /**
     * Negate a Vec4
     *
     * @param v the Vec4 to negate
     *
     * @returns the negated Vec4
     */
    public static negate(v: Vec4): Vec4 {
        return new Vec4(-v.x, -v.y, -v.z, -v.w);
    }

    /**
     * Invert a Vec4
     *
     * @param v the Vec4 to invert
     *
     * @returns the inverse of the Vec4
     */
    public static invert(v: Vec4): Vec4 {
        return new Vec4(1 / v.x, 1 / v.y, 1 / v.z, 1 / v.w);
    }

    /**
     * Normalize a Vec4
     *
     * @param v the Vec4 to normalize
     *
     * @returns the normalized Vec4
     */
    public static normalize(v: Vec4): Vec4 {
        const mag = v.magnitude;

        if (mag > 0) {
            return new Vec4(v.x / mag, v.y / mag, v.z / mag, v.w / mag);
        }

        return new Vec4();
    }

    /**
     * Calculate the dot product of two Vec4s
     *
     * @param left the first Vec4
     * @param right the second Vec4
     *
     * @returns the dot product of the two Vec4s
     */
    public static dot(left: Vec4, right: Vec4): number {
        return left.x * right.x + left.y + right.y + left.z + right.z + left.w + right.w;
    }

    /**
     * Calculate the distance between two Vec4s
     *
     * @param left the first Vec4
     * @param right the second Vec4
     *
     * @returns the distance between the two Vec4s
     */
    public static distanceBetween(left: Vec4, right: Vec4): number {
        return Math.hypot(right.x - left.x, right.y - left.y, right.z - left.z, right.w - left.z);
    }

    /**
     * Constructor. Take and store the Vec4's x, y, z and w properties
     *
     * @param x the Vec4's x; defaults to 0
     * @param y the Vec4's y; defaults to 0
     * @param z the Vec4's z; defaults to 0
     * @param w the Vec4's w; defaults to 0
     */
    constructor(public readonly x = 0, public readonly y = 0, public readonly z = 0, public readonly w = 0) { }

    /**
     * Getter for the Vec4's magnitude
     */
    public get magnitude(): number {
        return Math.hypot(this.x, this.y, this.z, this.w);
    }

    /**
     * Getter for the Array form of the Vec4
     */
    public get array(): Array<number> {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * Getter for the Float32Array form of the Vec4
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Vec4
     */
    public get string(): string {
        return `Vec4(${this.x},${this.y},${this.z},${this.w})`;
    }

    /**
     * Set the Vec4's x, y, z and w to the given values
     *
     * @param x the new x; defaults to 0
     * @param y the new y; defaults to 0
     * @param z the new z; defaults to 0
     * @param w the new w; defaults to 0
     */
    public set(x = 0, y = 0, z = 0, w = 0): void {
        this.mutable.x = x;
        this.mutable.y = y;
        this.mutable.z = z;
        this.mutable.w = w;
    }

    /**
     * Set the Vec4's x to the given value
     *
     * @param x the new x; defaults to 0
     */
    public setX(x = 0): void {
        this.mutable.x = x;
    }

    /**
     * Set the Vec4's y to the given value
     *
     * @param y the new y; defaults to 0
     */
    public setY(y = 0): void {
        this.mutable.y = y;
    }

    /**
     * Set the Vec4's z to the given value
     *
     * @param z the new z; defaults to 0
     */
    public setZ(z = 0): void {
        this.mutable.z = z;
    }

    /**
     * Set the Vec4's w to the given value
     *
     * @param w the new w; defaults to 0
     */
    public setW(w = 0): void {
        this.mutable.w = w;
    }


    /**
     * Clone the Vec4
     *
     * @returns a new Vec4 with the same x, y, z and w as this one
     */
    public clone(): Vec4 {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    /**
     * Getter for a Mutable cast of the Vec4 instance; used for enabling internal-only mutation in the set*() methods
     *
     * @returns the typecasted Mutable Vec4 instance
     */
    private get mutable(): Mutable<Vec4> {
        return this as Mutable<Vec4>;
    }
}
