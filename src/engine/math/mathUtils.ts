import { Vec3 } from '@protogl/math/vec3';

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

    public static rgbToHex(rgb: Vec3): string {
        function toHex(n: number): string {
            const hex = n.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }

        return `#${toHex(rgb.x)}${toHex(rgb.y)}${toHex(rgb.z)}`;
    }
}
