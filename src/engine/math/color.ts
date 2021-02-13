/**
 * Class representing a Color with properties r, g, b and optionally a
 */
export class Color {

    /**
     * Convert a hex string to an RGB Color.
     *
     * The given hex can be in the form #000000, 000000, #000 or 000.
     *
     * If the string is malformed or the wrong length, a default Color will be returned (0, 0, 0)
     *
     * @param hex the hex to convert
     *
     * @returns the converted Color
     */
    public static fromHex(hex: string): Color {
        let r = 0, g = 0, b = 0;

        if (hex.startsWith('#')) {
            switch (hex.length) {
                case 4:
                    // hex is of the form #000
                    r = parseInt(hex.substr(1, 1).repeat(2), 16);
                    g = parseInt(hex.substr(2, 1).repeat(2), 16);
                    b = parseInt(hex.substr(3, 1).repeat(2), 16);
                    break;
                case 7:
                    // hex is of the form #000000
                    r = parseInt(hex.substr(1, 2), 16);
                    g = parseInt(hex.substr(3, 2), 16);
                    b = parseInt(hex.substr(5, 2), 16);
                    break;
            }
        }
        else {
            switch (hex.length) {
                case 3:
                    // hex is of the form 000
                    r = parseInt(hex.substr(0, 1).repeat(2), 16);
                    g = parseInt(hex.substr(1, 1).repeat(2), 16);
                    b = parseInt(hex.substr(2, 1).repeat(2), 16);
                    break;
                case 6:
                    // hex is of the form 000000
                    r = parseInt(hex.substr(0, 2), 16);
                    g = parseInt(hex.substr(2, 2), 16);
                    b = parseInt(hex.substr(4, 2), 16);
                    break;
            }
        }

        // if any component is malformed, reset the Color
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            r = g = b = 0;
        }

        return new Color(r, g, b);
    }

    /**
     * Internal-use single-number hex converter
     *
     * @param n the number to convert
     *
     * @returns the hex form of the number
     */
    private static toHex(n: number): string {
        const hex = n.toString(16);

        return hex.length === 1 ? `0${hex}` : hex;
    }

    /**
     * Constructor. Take and store the Color's r, g, b and optionally a properties
     *
     * r, g and b are clamped to 255, and a is clamped to 1. Negative values will be set to 0
     *
     * @param r the Color's red value; 0-255; defaults to 0
     * @param g the Color's green value; 0-255; defaults to 0
     * @param b the Color's blue value; 0-255; defaults to 0
     * @param a the Color's alpha value (optional); 0-1
     */
    constructor(public readonly r = 0, public readonly g = 0, public readonly b = 0, public readonly a?: number) {
        this.r = Math.max(Math.min(r, 255), 0);
        this.g = Math.max(Math.min(g, 255), 0);
        this.b = Math.max(Math.min(b, 255), 0);

        if (a) {
            this.a = Math.max(Math.min(a, 1), 0);
        }
    }

    /**
     * Getter for the hex form of the Color
     */
    public get hex(): string {
        return `#${Color.toHex(this.r)}${Color.toHex(this.g)}${Color.toHex(this.b)}`;
    }

    /**
     * Getter for the GL-friendly Float32Array form of the Color
     */
    public get float32Array(): Float32Array {
        return Float32Array.from([this.rf, this.gf, this.bf, this.a ?? 1]);
    }

    /**
     * Getter for the gl-compatible clamped form of the Color's r number (0 -> 1)
     */
    public get rf(): number {
        return this.r / 255;
    }

    /**
     * Getter for the gl-compatible clamped form of the Color's g number (0 -> 1)
     */
    public get gf(): number {
        return this.g / 255;
    }

    /**
     * Getter for the gl-compatible clamped form of the Color's b number (0 -> 1)
     */
    public get bf(): number {
        return this.b / 255;
    }
}
