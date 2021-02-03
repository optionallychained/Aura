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
     * @param r the Color's red value
     * @param g the Color's green value
     * @param b the Color's blue value
     * @param a the Color's alpha value (optional)
     */
    constructor(public readonly r = 0, public readonly g = 0, public readonly b = 0, public readonly a?: number) { }

    /**
     * Getter for the hex form of the Color
     */
    public get hex(): string {
        return `#${Color.toHex(this.r)}${Color.toHex(this.g)}${Color.toHex(this.b)}`;
    }
}
