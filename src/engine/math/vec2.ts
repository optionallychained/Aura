export class Vec2 {

    public static add(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x + right.x, left.y + right.y);
    }

    public static sub(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x - right.x, left.y - right.y);
    }

    public static mult(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x * right.x, left.y * right.y);
    }

    public static div(left: Vec2, right: Vec2): Vec2 {
        return new Vec2(left.x / right.x, left.y / right.y);
    }

    public static scale(v: Vec2, factor: number): Vec2 {
        return new Vec2(v.x * factor, v.y * factor);
    }

    // TODO better name lol
    public static divScale(v: Vec2, factor: number): Vec2 {
        return new Vec2(v.x / factor, v.y / factor);
    }

    constructor(public x = 0, public y = 0) { }

    public set(x = 0, y = 0): void {
        this.x = x;
        this.y = y;
    }

    public setX(x = 0): void {
        this.x = x;
    }

    public setY(y = 0): void {
        this.y = y;
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
}
