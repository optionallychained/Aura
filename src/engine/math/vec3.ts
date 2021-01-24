/**
 * Class representing a three-dimensional Vector with properties x, y and z and providing static utilities for mathematical operations
 *
 * // TODO move to an entirely-static approach involving an {x,y,z} interface for core representation? Functional vs OO approach...
 */
export class Vec3 {

    /**
     * Constructor. Take and store the Vec3's x, y and z properties
     *
     * @param x the Vec3's x; defaults to 0
     * @param y the Vec3's y; defaults to 0
     * @param z the Vec3's z; defaults to 0
     */
    constructor(public x = 0, public y = 0, public z = 0) { }

    /**
     * Set the Vec3's x, y and z to the given values
     *
     * @param x the new x; defaults to 0
     * @param y the new y; defaults to 0
     * @param z the new z; defaults to 0
     */
    public set(x = 0, y = 0, z = 0): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Clone the Vec3
     *
     * @returns a new Vec3 with the same x, y and z as this one
     */
    public clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }
}
