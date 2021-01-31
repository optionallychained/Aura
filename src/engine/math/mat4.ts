export class Mat4 {

    /**
     * Internally-referenced static identity matrix
     */
    private static readonly IDENTITY = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    /**
     * Constructor. Take and store the Mat4's values
     *
     * @param values the Mat4's values; defaults to Mat4.IDENTITY
     */
    constructor(private readonly values: Array<number> = Mat4.IDENTITY.slice(0)) { }

    /**
     * Getter for the Array form of the Mat4
     */
    public get array(): Array<number> {
        return this.values;
    }

    /**
     * Getter for the Float32Array form of the Mat4
     */
    public get float32Array(): Float32Array {
        return Float32Array.from(this.array);
    }

    /**
     * Getter for the readable string form of the Mat4
     */
    public get string(): string {
        const v = this.values;

        return `Mat4(${v[0]},${v[1]},${v[2]},${v[3]},
                     ${v[4]},${v[5]},${v[6]},${v[7]},
                     ${v[8]},${v[9]},${v[10]},${v[11]}
                )`;
    }

    /**
     * Reset the Mat4's values to match the identity matrix
     */
    public reset(): void {
        // TODO hmmmm
        this.mutable.array = Mat4.IDENTITY.slice(0);
    }

    /**
     * Clone the Mat4
     *
     * @returns a new Mat4 with the same values as this one
     */
    public clone(): Mat4 {
        // TODO test whether or not the slice is necessary here
        return new Mat4(this.values.slice(0));
    }

    /**
     * Getter for a Mutable cast of the Mat4 instance; used for enabling internal-only mutation
     *
     * @returns the typecasted Mutable Mat4 instance
     */
    private get mutable(): Mutable<Mat4> {
        return this as Mutable<Mat4>;
    }
}
