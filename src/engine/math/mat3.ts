export class Mat3 {

    /**
     * Internally-referenced static identity matrix
     */
    private static readonly IDENTITY = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    /**
     * Constructor. Take and store the Mat3's values
     *
     * @param values the Mat3's values; defaults to Mat3.IDENTITY
     */
    constructor(private readonly values: Array<number> = Mat3.IDENTITY.slice(0)) { }

    /**
     * Getter for the Array form of the Mat3
     */
    public get array(): Array<number> {
        return this.values;
    }

    /**
     * Getter for the Float32Array form of the Mat3
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Mat3
     */
    public get string(): string {
        const v = this.values;

        return `Mat3(${v[0]},${v[1]},${v[2]},
                     ${v[3]},${v[4]},${v[5]},
                     ${v[6]},${v[7]},${v[8]}
                )`;
    }

    /**
     * Reset the Mat3's values to match the identity matrix
     */
    public reset(): void {
        // TODO hmmmm
        this.mutable.array = Mat3.IDENTITY.slice(0);
    }

    /**
     * Clone the Mat3
     *
     * @returns a new Mat3 with the same values as this one
     */
    public clone(): Mat3 {
        // TODO test whether or not the slice is necessary here
        return new Mat3(this.values.slice(0));
    }

    /**
     * Getter for a Mutable cast of the Mat3 instance; used for enabling internal-only mutation
     *
     * @returns the typecasted Mutable Mat3 instance
     */
    private get mutable(): Mutable<Mat3> {
        return this as Mutable<Mat3>;
    }
}
