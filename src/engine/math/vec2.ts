/**
 * Class representing a two-dimensional Vector with properties x and y and providing static utilities for mathematical operations
 *
 * // TODO move to an entirely-static approach involving an {x,y} interface for core representation? Functional vs OO approach...
 */
export class Vec2 {

    /**
     * Static adder; produce a new Vec2 adding the right to the left
     *
     * @param left the Vector to add to
     * @param right the Vector to add
     *
     * @returns a new Vec2 containing the result of the addition
     */
    public static add(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x + right.x, left.y + right.y);
    }

    /**
     * Static subtractor; produce a new Vec2 subtracting the right from the left
     *
     * @param left the Vector to subtract from
     * @param right the Vector to subtract
     *
     * @returns a new Vec2 containing the result of the subtraction
     */
    public static sub(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x - right.x, left.y - right.y);
    }

    /**
     * Static multiplier; produce a new Vec2 multiplying the left by the right
     *
     * @param left the Vector to multiply
     * @param right the Vector to multiply by
     *
     * @returns a new Vec2 containing the result of the multiplication
     */
    public static mult(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x * right.x, left.y * right.y);
    }

    /**
     * Static divider; produce a new Vec2 dividing the left by the right
     *
     * @param left the Vector to divide
     * @param right the Vector to divide by
     *
     * @returns a new Vec2 containing the result of the division
     */
    public static div(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x / right.x, left.y / right.y);
    }

    /**
     * Static scalar multiplication; produce a new Vec2 scaling the Vector by the factor
     *
     * @param v the Vector to scale
     * @param factor the factor to scale by
     *
     * @returns a new Vec2 containing the result of the scalar multiplication
     */
    public static scale(v: Vec2, factor: number): Vec2 {
        return new Vec2(v.x * factor, v.y * factor);
    }

    /**
     * Constructor. Take and store the Vec2's x and y properties
     *
     * @param x the Vec2's x; defaults to 0
     * @param y the Vec2's y; defaults to 0
     */
    constructor(public x = 0, public y = 0) { }

    /**
     * Set the Vec2's x and y to the given values
     *
     * @param x the new x; defaults to 0
     * @param y the new y; defaults to 0
     */
    public set(x = 0, y = 0): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Set the Vec2's x to the given value
     *
     * @param x the new x; defaults to 0
     */
    public setX(x = 0): void {
        this.x = x;
    }

    /**
     * Set the Vec2's y to the given value
     *
     * @param y the new y; defaults to 0
     */
    public setY(y = 0): void {
        this.y = y;
    }

    /**
     * Clone the Vec2
     *
     * @returns a new Vec2 with the same x and y as this one
     */
    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
}
