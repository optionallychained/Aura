export class Vec3 {

    constructor(public x = 0, public y = 0, public z = 0) { }

    public set(x = 0, y = 0, z = 0): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }
}
