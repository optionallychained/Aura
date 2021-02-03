/**
 * Utility class for converting angles
 */
export class Angle {

    /**
     * Convert an angle given in degrees to radians
     *
     * @param radians the angle to convert
     *
     * @returns the angle in radians
     */
    public static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    /**
     * Convert an angle given in radians to degrees
     *
     * @param radians the angle to convert
     *
     * @returns the angle in degrees
     */
    public static toDegrees(radians: number): number {
        return radians * 180 / Math.PI;
    }
}
