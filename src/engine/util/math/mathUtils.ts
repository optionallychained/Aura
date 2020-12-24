export class MathUtils {

    public static degToRad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    public static radToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    public static randomBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
