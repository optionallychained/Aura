import { Mat4 } from './mat4';

/**
 * Class representing a three-dimensional Vector with properties x, y and z and providing static utilities for mathematical operations
 */
export class Vec3 {

    /**
     * Add two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the result of the addition
     */
    public static add(left: Vec3, right: Vec3): Vec3 {
        return new Vec3(left.x + right.x, left.y + right.y, left.z + right.z);
    }

    /**
     * Subtract the right Vec3 from the left
     *
     * @param left the Vec3 to subtract from
     * @param right the Vec3 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Vec3, right: Vec3): Vec3 {
        return new Vec3(left.x - right.x, left.y - right.y, left.z - right.z);
    }

    /**
     * Multiply two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Vec3, right: Vec3): Vec3 {
        return new Vec3(left.x * right.x, left.y * right.y, left.z * right.z);
    }

    /**
     * Divide the left Vec3 by the right
     *
     * @param left the Vec3 to divide
     * @param right the Vec3 to divide by
     *
     * @returns the result of the division
     */
    public static div(left: Vec3, right: Vec3): Vec3 {
        return new Vec3(left.x / right.x, left.y / right.y, left.z / right.z);
    }

    /**
     * Scale a Vec3 by a given factor
     *
     * @param v the Vec3 to scale
     * @param factor the factor to scale by
     *
     * @returns the scaled Vec3
     */
    public static scale(v: Vec3, factor: number): Vec3 {
        return new Vec3(v.x * factor, v.y * factor, v.z * factor);
    }

    /**
     * Negate a Vec3
     *
     * @param v the Vec3 to negate
     *
     * @returns the negated Vec3
     */
    public static negate(v: Vec3): Vec3 {
        return new Vec3(-v.x, -v.y, -v.z);
    }

    /**
     * Invert a Vec3
     *
     * @param v the Vec3 to invert
     *
     * @returns the inverse of the Vec3
     */
    public static invert(v: Vec3): Vec3 {
        return new Vec3(1 / v.x, 1 / v.y, 1 / v.z);
    }

    /**
     * Normalize a Vec3
     *
     * @param v the Vec3 to normalize
     *
     * @return the normalized Vec3
     */
    public static normalize(v: Vec3): Vec3 {
        const mag = v.magnitude;

        if (mag > 0) {
            return new Vec3(v.x / mag, v.y / mag, v.z / mag);
        }

        return new Vec3();
    }

    /**
     * Calculate the dot product of two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the dot product of the two Vec3s
     */
    public static dot(left: Vec3, right: Vec3): number {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    }

    /**
     * Calculate the cross product of two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the cross product of the two Vec3s
     */
    public static cross(left: Vec3, right: Vec3): Vec3 {
        return new Vec3(
            left.y * right.z - left.z * right.y,
            left.z * right.x - left.x * right.z,
            left.x * right.y - left.y * right.x
        );
    }

    /**
     * Calculate the distance between two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the distance between the two Vec3s
     */
    public static distanceBetween(left: Vec3, right: Vec3): number {
        return Math.hypot(right.x - left.x, right.y - left.y, right.z - left.z);
    }

    /**
     * Calculate the angle between two Vec3s
     *
     * @param left the first Vec3
     * @param right the second Vec3
     *
     * @returns the angle between the two Vec3s (radians)
     */
    public static angleBetween(left: Vec3, right: Vec3): number {
        const leftMag = left.magnitude;
        const rightMag = right.magnitude;
        const product = leftMag * rightMag;

        const dot = Vec3.dot(left, right);

        if (product > 0) {
            return Math.acos(dot / product);
        }

        // TODO is this correct?
        return 0;
    }

    /**
     * Rotate a Vec3 by a given angle (radians) about a given orgin around the X axis
     *
     * @param v the Vec3 to rotate
     * @param origin the origin of the rotation
     * @param angle the angle to rotate by
     *
     * @returns the rotated Vec3
     */
    public static rotateX(v: Vec3, origin: Vec3, angle: number): Vec3 {
        const translate = [
            v.x - origin.x,
            v.y - origin.y,
            v.z - origin.z
        ];

        const rotate = [
            translate[0],
            translate[1] * Math.cos(angle) - translate[2] * Math.sin(angle),
            translate[1] * Math.sin(angle) + translate[2] * Math.cos(angle)
        ];

        return new Vec3(
            rotate[0] + origin.x,
            rotate[1] + origin.y,
            rotate[2] + origin.z
        );
    }

    /**
     * Rotate a Vec3 by a given angle (radians) about a given orgin around the Y axis
     *
     * @param v the Vec3 to rotate
     * @param origin the origin of the rotation
     * @param angle the angle to rotate by
     *
     * @returns the rotated Vec3
     */
    public static rotateY(v: Vec3, origin: Vec3, angle: number): Vec3 {
        const translate = [
            v.x - origin.x,
            v.y - origin.y,
            v.z - origin.z
        ];

        const rotate = [
            translate[2] * Math.sin(angle) + translate[0] * Math.cos(angle),
            translate[1],
            translate[2] * Math.cos(angle) - translate[0] * Math.sin(angle)
        ];

        return new Vec3(
            rotate[0] + origin.x,
            rotate[1] + origin.y,
            rotate[2] + origin.z
        );
    }

    /**
     * Rotate a Vec3 by a given angle (radians) about a given orgin around the Z axis
     *
     * @param v the Vec3 to rotate
     * @param origin the origin of the rotation
     * @param angle the angle to rotate by
     *
     * @returns the rotated Vec3
     */
    public static rotateZ(v: Vec3, origin: Vec3, angle: number): Vec3 {
        const translate = [
            v.x - origin.x,
            v.y - origin.y,
            v.z - origin.z
        ];

        const rotate = [
            translate[0] * Math.cos(angle) - translate[1] * Math.sin(angle),
            translate[0] * Math.sin(angle) + translate[1] * Math.cos(angle),
            translate[2]
        ];

        return new Vec3(
            rotate[0] + origin.x,
            rotate[1] + origin.y,
            rotate[2] + origin.z
        );
    }

    /**
     * Transform a Vec3 by a given Mat4 transformation matrix
     *
     * @param v the Vec3 to transform
     * @param m the Mat4 to transform by
     *
     * @returns the transformed Vec3
     */
    public static transformByMat4(v: Vec3, m: Mat4): Vec3 {
        const { x, y, z } = v;

        const a = m.array,

            m00 = a[0], m01 = a[1], m02 = a[2],
            m10 = a[4], m11 = a[5], m12 = a[6],
            m20 = a[8], m21 = a[9], m22 = a[10],
            m30 = a[12], m31 = a[13], m32 = a[14];

        return new Vec3(
            m00 * x + m10 * y + m20 * z + m30,
            m01 * x + m11 * y + m21 * z + m31,
            m02 * x + m12 * y + m22 * z + m32
        );
    }

    /**
     * Constructor. Take and store the Vec3's x, y and z properties
     *
     * @param x the Vec3's x; defaults to 0
     * @param y the Vec3's y; defaults to 0
     * @param z the Vec3's z; defaults to 0
     */
    constructor(public readonly x = 0, public readonly y = 0, public readonly z = 0) { }

    /**
     * Getter for the Vec3's magnitude
     */
    public get magnitude(): number {
        return Math.hypot(this.x, this.y, this.z);
    }

    /**
     * Getter for the Array form of the Vec3
     */
    public get array(): Array<number> {
        return [this.x, this.y, this.z];
    }

    /**
     * Getter for the Float32Array form of the Vec3
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Vec3
     */
    public get string(): string {
        return `Vec3( ${this.x} , ${this.y} , ${this.z} )`;
    }

    /**
     * Set the Vec3's x, y and z to the given values
     *
     * @param x the new x; defaults to 0
     * @param y the new y; defaults to 0
     * @param z the new z; defaults to 0
     */
    public set(x = 0, y = 0, z = 0): void {
        this.mutable.x = x;
        this.mutable.y = y;
        this.mutable.z = z;
    }

    /**
     * Set the Vec3's x to the given value
     *
     * @param x the new x; defaults to 0
     */
    public setX(x = 0): void {
        this.mutable.x = x;
    }

    /**
     * Set the Vec3's y to the given value
     *
     * @param y the new y; defaults to 0
     */
    public setY(y = 0): void {
        this.mutable.y = y;
    }

    /**
     * Set the Vec3's y to the given value
     *
     * @param y the new y; defaults to 0
     */
    public setZ(z = 0): void {
        this.mutable.z = z;
    }

    /**
     * Clone the Vec3
     *
     * @returns a new Vec3 with the same x, y and z as this one
     */
    public clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * Getter for a Mutable cast of the Vec3 instance; used for enabling internal-only mutation in the set*() methods
     *
     * @returns the typecasted Mutable Vec3 instance
     */
    private get mutable(): Mutable<Vec3> {
        return this as Mutable<Vec3>;
    }
}
