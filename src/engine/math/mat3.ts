import { Vec2 } from './vec2';

/**
 * Class representing a 3x3 Matrix and providing static utilities for mathematical operations
 */
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
     * Add two Mat3s
     *
     * @param left the first Mat3
     * @param right the second Mat3
     *
     * @returns the result of the addition
     */
    public static add(left: Mat3, right: Mat3): Mat3 {
        const lv = left.values, rv = right.values;

        return new Mat3([
            lv[0] + rv[0], lv[1] + rv[1], lv[2] + rv[2],
            lv[3] + rv[3], lv[4] + rv[4], lv[5] + rv[5],
            lv[6] + rv[6], lv[7] + rv[7], lv[8] + rv[8]
        ]);
    }

    /**
     * Subtract the right Mat3 from the left
     *
     * @param left the Mat3 to subtract from
     * @param right the Mat3 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Mat3, right: Mat3): Mat3 {
        const lv = left.values, rv = right.values;

        return new Mat3([
            lv[0] - rv[0], lv[1] - rv[1], lv[2] - rv[2],
            lv[3] - rv[3], lv[4] - rv[4], lv[5] - rv[5],
            lv[6] - rv[6], lv[7] - rv[7], lv[8] - rv[8],
        ]);
    }

    /**
     * Multiply two Mat3s
     *
     * @param left the first Mat3
     * @param right the second Mat3
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Mat3, right: Mat3): Mat3 {
        const lv = left.values, rv = right.values,

            // left
            l00 = lv[0], l01 = lv[1], l02 = lv[2],
            l10 = lv[3], l11 = lv[4], l12 = lv[5],
            l20 = lv[6], l21 = lv[7], l22 = lv[8],

            // right
            r00 = rv[0], r01 = rv[1], r02 = rv[2],
            r10 = rv[3], r11 = rv[4], r12 = rv[5],
            r20 = rv[6], r21 = rv[7], r22 = rv[8],

            // result (dot products of [lRowY],[rColX])
            p00 = l00 * r00 + l01 * r10 + l02 * r20,
            p01 = l00 * r01 + l01 * r11 + l02 * r21,
            p02 = l00 * r02 + l01 * r12 + l02 * r22,

            p10 = l10 * r00 + l11 * r10 + l12 * r20,
            p11 = l10 * r01 + l11 * r11 + l12 * r21,
            p12 = l10 * r02 + l11 * r12 + l12 * r22,

            p20 = l20 * r00 + l21 * r10 + l22 * r20,
            p21 = l20 * r01 + l21 * r11 + l22 * r21,
            p22 = l20 * r02 + l21 * r12 + l22 * r22;

        return new Mat3([
            p00, p01, p02,
            p10, p11, p12,
            p20, p21, p22
        ]);
    }

    /**
     * Multiply a Mat3 by a given scalar factor
     *
     * @param m the Mat3 to multiply
     * @param factor the factor to multiply by
     *
     * @returns the multiplied Mat3
     */
    public static multScalar(m: Mat3, factor: number): Mat3 {
        const v = m.values;

        return new Mat3([
            v[0] * factor, v[1] * factor, v[2] * factor,
            v[3] * factor, v[4] * factor, v[5] * factor,
            v[6] * factor, v[7] * factor, v[8] * factor,
        ]);
    }

    /**
     * Invert a Mat3
     *
     * @param m the Mat3 to invert
     *
     * @returns the inverse of the Mat3
     */
    public static invert(m: Mat3): Mat3 | null {
        const { determinant } = m;

        if (!determinant) {
            return null;
        }

        // inverse is (1 / determinant) x adjugate
        return Mat3.multScalar(Mat3.adjoint(m), 1 / determinant);
    }

    /**
     * Transpose a Mat3
     *
     * @param m the Mat3 to transpose
     *
     * @return the transposed Mat3
     */
    public static transpose(m: Mat3): Mat3 {
        const v = m.values,

            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8];

        return new Mat3([
            v00, v10, v20,
            v01, v11, v21,
            v02, v12, v22
        ]);
    }

    /**
     * Calculate the adjugate of a Mat3
     *
     * @param m the Mat3
     *
     * @returns the adjugate of the Mat3
     */
    public static adjoint(m: Mat3): Mat3 {
        const v = m.values,

            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8],

            // matrix of minors (determinants of submatrices)
            m00 = (v11 * v22) - (v12 * v21), m01 = (v10 * v22) - (v12 * v20), m02 = (v10 * v21) - (v11 * v20),
            m10 = (v01 * v22) - (v02 * v21), m11 = (v00 * v22) - (v02 * v20), m12 = (v00 * v21) - (v01 * v20),
            m20 = (v01 * v12) - (v02 * v11), m21 = (v00 * v12) - (v02 * v10), m22 = (v00 * v11) - (v01 * v10),

            // cofactor
            c00 = m00, c01 = -m01, c02 = m02,
            c10 = -m10, c11 = m11, c12 = -m12,
            c20 = m20, c21 = -m21, c22 = m22;

        // transposed cofactor
        return new Mat3([
            c00, c10, c20,
            c01, c11, c21,
            c02, c12, c22
        ]);
    }

    /**
     * Translate a Mat3 by a Vec2 along the x and y
     *
     * @param m the Mat3 to translate
     * @param translate the Vec2 to translate by
     *
     * @returns the translated Mat3
     */
    public static translate(m: Mat3, translate: Vec2): Mat3 {
        const v = m.values,

            { x, y } = translate,

            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8];

        return new Mat3([
            v00, v01, v02,
            v10, v11, v12,
            // r20
            x * v00 + y * v10 + v20,
            // r21
            x * v01 + y * v11 + v21,
            // r22
            x * v02 + y * v12 + v22
        ]);
    }

    /**
     * Rotate a Mat3 by a given angle angle (radians)
     *
     * @param m the Mat3 to rotate
     * @param angle the angle to rotate by
     *
     * @returns the rotated Mat3
     */
    public static rotate(m: Mat3, angle: number): Mat3 {
        const v = m.values,

            sin = Math.sin(angle), cos = Math.cos(angle),

            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8];

        return new Mat3([
            cos * v00 + sin * v10, cos * v01 + sin * v11, cos * v02 + sin * v12,
            cos * v10 - sin * v00, cos * v11 - sin * v01, cos * v12 - sin * v02,
            v20, v21, v22
        ]);
    }

    /**
     * Scale a Mat3 by factors on the x and y axes, given as a Vec2
     *
     * @param m the Mat3 to scale
     * @param factor the Vec2 to scale by
     *
     * @returns the scaled Mat3
     */
    public static scale(m: Mat3, factor: Vec2): Mat3 {
        const v = m.values,

            { x, y } = factor,

            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8];

        return new Mat3([
            x * v00, x * v01, x * v02,
            y * v10, y * v11, y * v12,
            v20, v21, v22
        ]);
    }

    /**
     * Constructor. Take and store the Mat3's values
     *
     * @param values the Mat3's values; defaults to Mat3.IDENTITY
     */
    constructor(private readonly values: Array<number> = Mat3.IDENTITY.slice(0)) { }

    /**
     * Getter for the Mat3's determinant
     */
    public get determinant(): number {
        // using shortcut method for 3x3 determinants
        // unused values left for visual clarity
        /* eslint-disable @typescript-eslint/no-unused-vars */

        const v = this.values,

            // copy columns 0,1 => 3,4
            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[0], v04 = v[1],
            v10 = v[3], v11 = v[4], v12 = v[5], v13 = v[3], v14 = v[4],
            v20 = v[6], v21 = v[7], v22 = v[8], v23 = v[6], v24 = v[7],

            // products of left->right diagonals
            d1 = v00 * v11 * v22,
            d2 = v01 * v12 * v23,
            d3 = v02 * v13 * v24,

            // products of right->left diagonals
            nd1 = v04 * v13 * v22,
            nd2 = v03 * v12 * v21,
            nd3 = v02 * v11 * v20;

        return d1 + d2 + d3 - nd1 - nd2 - nd3;
    }

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

        return `Mat3( ${v[0]} , ${v[1]} , ${v[2]} ,
                      ${v[3]} , ${v[4]} , ${v[5]} ,
                      ${v[6]} , ${v[7]} , ${v[8]}
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
