import { Vec3 } from './vec3';

/**
 * A class of static utility math methods
 */
export class MathUtils {

    /**
     * Convert an angle given in degrees to radians
     *
     * @param deg the angle in degrees to convert
     *
     * @returns the converted angle in radians
     */
    public static degToRad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    /**
     * Convert an angle given in radians to degrees
     *
     * @param rad the angle in radians to convert
     *
     * @returns the converted angle in degrees
     */
    public static radToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    /**
     * Produce a random integer between two given values
     *
     * @param min the minimum number
     * @param max the maximum number
     *
     * @returns the generated random number
     */
    public static randomBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * Convert an RGB color to a Hex string
     *
     * @param rgb the RGB color, expressed as a Vec3
     *
     * @returns the converted Hex string
     */
    public static rgbToHex(rgb: Vec3): string {
        function toHex(n: number): string {
            const hex = n.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }

        return `#${toHex(rgb.x)}${toHex(rgb.y)}${toHex(rgb.z)}`;
    }
}
