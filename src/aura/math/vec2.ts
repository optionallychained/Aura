import { Mutable } from '../types';
import { Mat3 } from './mat3';
import { Vec3 } from './vec3';

/**
 * Class representing a two-dimensional Vector with properties x and y and providing static utilities for mathematical operations
 */
export class Vec2 {

    /**
     * Add two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the result of the addition
     */
    public static add(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x + right.x, left.y + right.y);
    }

    /**
     * Subtract the right Vec2 from the left
     *
     * @param left the Vec2 to subtract from
     * @param right the Vec2 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x - right.x, left.y - right.y);
    }

    /**
     * Multiply two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x * right.x, left.y * right.y);
    }

    /**
     * Divide the left Vec2 by the right
     *
     * @param left the Vec2 to divide
     * @param right the Vec2 to divide by
     *
     * @returns the result of the division
     */
    public static div(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x / right.x, left.y / right.y);
    }

    /**
     * Scale a Vec2 by a given factor
     *
     * @param v the Vec2 to scale
     * @param factor the factor to scale by
     *
     * @returns the scaled Vec2
     */
    public static scale(v: Vec2, factor: number): Vec2 {
        return new Vec2(v.x * factor, v.y * factor);
    }

    /**
     * Negate a Vec2
     *
     * @param v the Vec2 to negate
     *
     * @returns the negated Vec2
     */
    public static negate(v: Vec2): Vec2 {
        return new Vec2(-v.x, -v.y);
    }

    /**
     * Invert a Vec2
     *
     * @param v the Vec2 to invert
     *
     * @returns the inverse of the Vec2
     */
    public static invert(v: Vec2): Vec2 {
        return new Vec2(1 / v.x, 1 / v.y);
    }

    /**
     * Normalize a Vec2
     *
     * @param v the Vec2 to normalize
     *
     * @returns the normalized Vec2
     */
    public static normalize(v: Vec2): Vec2 {
        const mag = v.magnitude;

        if (mag > 0) {
            return new Vec2(v.x / mag, v.y / mag);
        }

        return new Vec2();
    }

    /**
     * Calculate the dot product of two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the dot product of the two Vec2s
     */
    public static dot(left: Vec2, right: Vec2): number {
        return left.x * right.x + left.y * right.y;
    }

    /**
     * Calculate the cross product of two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the cross product of the two Vec2s (a Vec3)
     */
    public static cross(left: Vec2, right: Vec2): Vec3 {
        return new Vec3(0, 0, left.x * right.y - left.y * right.x);
    }

    /**
     * Calculate the distance between two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the distance between the two Vec2s
     */
    public static distanceBetween(left: Vec2, right: Vec2): number {
        return Math.hypot(right.x - left.x, right.y - left.y);
    }

    /**
     * Calculate the angle between two Vec2s
     *
     * @param left the first Vec2
     * @param right the second Vec2
     *
     * @returns the angle between the two Vec2s (radians)
     */
    public static angleBetween(left: Vec2, right: Vec2): number {
        const leftMag = left.magnitude;
        const rightMag = right.magnitude;
        const product = leftMag * rightMag;

        const dot = Vec2.dot(left, right);

        if (product > 0) {
            return Math.acos(dot / product);
        }

        // TODO is this correct?
        return 0;
    }

    /**
     * Rotate a Vec2 by a given angle (radians)
     *
     * @param v the Vec2 to rotate
     * @param angle the angle to rotate by
     *
     * @returns the rotated Vec2
     */
    public static rotate(v: Vec2, angle: number): Vec2 {
        const ca = Math.cos(angle);
        const sa = Math.sin(angle);

        return new Vec2(
            v.x * ca - v.y * sa,
            v.x * sa + v.y * ca
        );
    }

    /**
     * Clamp the components of a given Vec2 to between the components of the given min and max
     *
     * @param v the Vec2 to clamp
     * @param min the Vec2 representing the minimum x and y values for v
     * @param max the Vec2 representing the maximum x and y values for v
     *
     * @returns the clamped Vec2
     */
    public static clamp(v: Vec2, min: Vec2, max: Vec2): Vec2 {
        return new Vec2(Math.min(Math.max(v.x, min.x), max.x), Math.min(Math.max(v.y, min.y), max.y));
    }

    /**
     * Transform a Vec2 by a given Mat3 transformation matrix
     *
     * @param v the Vec2 to transform
     * @param m the Mat3 to transform by
     *
     * @returns the transformed Vec2
     */
    public static transformByMat3(v: Vec2, m: Mat3): Vec2 {
        const { x, y } = v;

        const a = m.array,
            m00 = a[0], m01 = a[1],
            m10 = a[3], m11 = a[4],
            m20 = a[6], m21 = a[7];

        return new Vec2(
            m00 * x + m10 * y + m20,
            m01 * x + m11 * y + m21
        );
    }

    /**
     * Constructor. Take and store the Vec2's x and y properties
     *
     * @param x the Vec2's x; defaults to 0
     * @param y the Vec2's y; defaults to 0
     */
    constructor(public readonly x = 0, public readonly y = 0) { }

    /**
     * Getter for the Vec2's magnitude
     */
    public get magnitude(): number {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Getter for the Array form of the Vec2
     */
    public get array(): Array<number> {
        return [this.x, this.y];
    }

    /**
     * Getter for the Float32Array form of the Vec2
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Vec2
     */
    public get string(): string {
        return `Vec2( ${this.x} , ${this.y} )`;
    }

    /**
     * Set the Vec2's x and y to the given values
     *
     * @param x the new x; defaults to 0
     * @param y the new y; defaults to 0
     */
    public set(x = 0, y = 0): void {
        this.mutable.x = x;
        this.mutable.y = y;
    }

    /**
     * Set the Vec2's x to the given value
     *
     * @param x the new x; defaults to 0
     */
    public setX(x = 0): void {
        this.mutable.x = x;
    }

    /**
     * Set the Vec2's y to the given value
     *
     * @param y the new y; defaults to 0
     */
    public setY(y = 0): void {
        this.mutable.y = y;
    }

    /**
     * Clone the Vec2
     *
     * @returns a new Vec2 with the same x and y as this one
     */
    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    /**
     * Getter for a Mutable cast of the Vec2 instance; used for enabling internal-only mutation in the set*() methods
     *
     * @returns the typecasted Mutable Vec2 instance
     */
    private get mutable(): Mutable<Vec2> {
        return this as Mutable<Vec2>;
    }
}
