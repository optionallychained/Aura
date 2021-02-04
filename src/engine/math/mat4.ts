import { Vec3 } from './vec3';

/**
 * Class representing a 4x4 Matrix and providing static utilities for mathematical operations
 */
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
     * Add two Mat4s
     *
     * @param left the first Mat4
     * @param right the second Mat4
     *
     * @returns the result of the addition
     */
    public static add(left: Mat4, right: Mat4): Mat4 {
        const lv = left.array, rv = right.array;

        return new Mat4([
            lv[0] + rv[0], lv[1] + rv[1], lv[2] + rv[2], lv[3] + rv[3],
            lv[4] + rv[4], lv[5] + rv[5], lv[6] + rv[6], lv[7] + rv[7],
            lv[8] + rv[8], lv[9] + rv[9], lv[10] + rv[10], lv[11] + rv[11],
            lv[12] + rv[12], lv[13] + rv[13], lv[14] + rv[14], lv[15] + rv[15]
        ]);
    }

    /**
     * Subtract the right Mat4 from the left
     *
     * @param left the Mat4 to subtract from
     * @param right the Mat4 to subtract
     *
     * @returns the result of the subtraction
     */
    public static sub(left: Mat4, right: Mat4): Mat4 {
        const lv = left.array, rv = right.array;

        return new Mat4([
            lv[0] - rv[0], lv[1] - rv[1], lv[2] - rv[2], lv[3] - rv[3],
            lv[4] - rv[4], lv[5] - rv[5], lv[6] - rv[6], lv[7] - rv[7],
            lv[8] - rv[8], lv[9] - rv[9], lv[10] - rv[10], lv[11] - rv[11],
            lv[12] - rv[12], lv[13] - rv[13], lv[14] - rv[14], lv[15] - rv[15]
        ]);
    }

    /**
     * Multiply two Mat4s
     *
     * @param left the first Mat4
     * @param right the second Mat4
     *
     * @returns the result of the multiplication
     */
    public static mult(left: Mat4, right: Mat4): Mat4 {
        const lv = left.array, rv = right.array,

            // left
            l00 = lv[0], l01 = lv[1], l02 = lv[2], l03 = lv[3],
            l10 = lv[4], l11 = lv[5], l12 = lv[6], l13 = lv[7],
            l20 = lv[8], l21 = lv[9], l22 = lv[10], l23 = lv[11],
            l30 = lv[12], l31 = lv[13], l32 = lv[14], l33 = lv[15],

            // right
            r00 = rv[0], r01 = rv[1], r02 = rv[2], r03 = rv[3],
            r10 = rv[4], r11 = rv[5], r12 = rv[6], r13 = rv[7],
            r20 = rv[8], r21 = rv[9], r22 = rv[10], r23 = rv[11],
            r30 = rv[12], r31 = rv[13], r32 = rv[14], r33 = rv[15],

            // result (dot products of [lRowY],[rColX])
            p00 = l00 * r00 + l01 * r10 + l02 * r20 + l03 * r30,
            p01 = l00 * r01 + l01 * r11 + l02 * r21 + l03 * r31,
            p02 = l00 * r02 + l01 * r12 + l02 * r22 + l03 * r32,
            p03 = l00 * r03 + l01 * r13 + l02 * r23 + l03 * r33,

            p10 = l10 * r00 + l11 * r10 + l12 * r20 + l13 * r30,
            p11 = l10 * r01 + l11 * r11 + l12 * r21 + l13 * r31,
            p12 = l10 * r02 + l11 * r12 + l12 * r22 + l13 * r32,
            p13 = l10 * r03 + l11 * r13 + l12 * r23 + l13 * r33,

            p20 = l20 * r00 + l21 * r10 + l22 * r20 + l23 * r30,
            p21 = l20 * r01 + l21 * r11 + l22 * r21 + l23 * r31,
            p22 = l20 * r02 + l21 * r12 + l22 * r22 + l23 * r32,
            p23 = l20 * r03 + l21 * r13 + l22 * r23 + l23 * r33,

            p30 = l30 * r00 + l31 * r10 + l32 * r20 + l33 * r30,
            p31 = l30 * r01 + l31 * r11 + l32 * r21 + l33 * r31,
            p32 = l30 * r02 + l31 * r12 + l32 * r23 + l33 * r32,
            p33 = l30 * r03 + l31 * r13 + l32 * r23 + l33 * r33;

        return new Mat4([
            p00, p01, p02, p03,
            p10, p11, p12, p13,
            p20, p21, p22, p23,
            p30, p31, p32, p33
        ]);
    }

    /**
     * Multiply a Mat4 by a given scalar factor
     *
     * @param m the Mat4 to multiply
     * @param factor the factor to multiply by
     *
     * @returns the multiplied Mat4
     */
    public static multScalar(m: Mat4, factor: number): Mat4 {
        const v = m.array;

        return new Mat4([
            v[0] * factor, v[1] * factor, v[2] * factor, v[3] * factor,
            v[4] * factor, v[5] * factor, v[6] * factor, v[7] * factor,
            v[8] * factor, v[9] * factor, v[10] * factor, v[11] * factor,
            v[12] * factor, v[13] * factor, v[14] * factor, v[15] * factor
        ]);
    }

    /**
     * Invert a Mat4
     *
     * @param m the Mat4 to invert
     *
     * @returns the inverse of the Mat4
     */
    public static invert(m: Mat4): Mat4 | null {
        const { determinant } = m;

        if (!determinant) {
            return null
        }

        // inverse is (1 / determinant) x adjugate
        return Mat4.multScalar(Mat4.adjoint(m), 1 / determinant);
    }

    /**
     * Transpose a Mat4
     *
     * @param m the Mat4 to transpose
     *
     * @return the transposed Mat4
     */
    public static transpose(m: Mat4): Mat4 {
        const v = m.array,

            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15];

        return new Mat4([
            v00, v10, v20, v30,
            v01, v11, v21, v31,
            v02, v12, v22, v32,
            v03, v13, v23, v33
        ]);
    }

    /**
     * Calculate the adjugate of a Mat4
     *
     * @param m the Mat4
     *
     * @returns the adjugate of the Mat4
     */
    public static adjoint(m: Mat4): Mat4 {
        const v = m.array,

            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15],

            // matrix of minors (determinants of submatrices)
            // using standard method for 3x3 determinants
            // TODO simplify (maybe?) by extracting repeated expressions
            m00 = (v11 * ((v22 * v33) - (v23 * v32))) - (v12 * ((v21 * v33) - (v23 - v31))) - (v13 * ((v21 * v31) - (v22 * v31))),
            m01 = (v10 * ((v22 * v33) - (v23 * v32))) - (v12 * ((v20 * v33) - (v23 * v30))) - (v13 * ((v20 * v32) - (v22 * v30))),
            m02 = (v10 * ((v21 * v33) - (v23 * v31))) - (v11 * ((v20 * v33) - (v23 * v30))) - (v13 * ((v20 * v31) - (v21 * v30))),
            m03 = (v10 * ((v21 * v32) - (v22 * v31))) - (v11 * ((v20 * v32) - (v22 * v30))) - (v12 * ((v20 * v31) - (v21 * v30))),

            m10 = (v01 * ((v22 * v33) - (v23 * v32))) - (v02 * ((v21 * v33) - (v23 * v31))) - (v03 * ((v21 * v32) - (v22 * v31))),
            m11 = (v00 * ((v22 * v33) - (v23 * v32))) - (v02 * ((v20 * v33) - (v23 * v30))) - (v03 * ((v20 * v32) - (v22 * v30))),
            m12 = (v00 * ((v21 * v33) - (v23 * v31))) - (v01 * ((v20 * v33) - (v23 * v30))) - (v03 * ((v20 * v31) - (v21 * v30))),
            m13 = (v00 * ((v21 * v32) - (v22 * v31))) - (v01 * ((v20 * v32) - (v22 * v30))) - (v02 * ((v20 * v31) - (v21 * v30))),

            m20 = (v01 * ((v12 * v33) - (v13 * v32))) - (v02 * ((v11 * v33) - (v13 * v31))) - (v03 * ((v11 * v31) - (v12 * v31))),
            m21 = (v00 * ((v12 * v33) - (v13 * v31))) - (v02 * ((v10 * v33) - (v13 * v30))) - (v03 * ((v10 * v32) - (v12 * v30))),
            m22 = (v00 * ((v11 * v33) - (v13 * v31))) - (v01 * ((v10 * v33) - (v13 * v30))) - (v03 * ((v10 * v31) - (v11 * v30))),
            m23 = (v00 * ((v11 * v32) - (v12 * v31))) - (v01 * ((v10 * v32) - (v12 * v30))) - (v02 * ((v10 * v31) - (v11 * v30))),

            m30 = (v01 * ((v12 * v23) - (v13 * v22))) - (v02 * ((v11 * v23) - (v13 * v21))) - (v03 * ((v11 * v22) - (v12 * v21))),
            m31 = (v00 * ((v12 * v23) - (v13 * v22))) - (v02 * ((v10 * v23) - (v13 * v20))) - (v03 * ((v10 * v22) - (v12 * v20))),
            m32 = (v00 * ((v11 * v23) - (v13 * v21))) - (v01 * ((v10 * v23) - (v13 * v20))) - (v03 * ((v10 * v21) - (v11 * v20))),
            m33 = (v00 * ((v11 * v22) - (v12 * v21))) - (v01 * ((v10 * v22) - (v12 * v20))) - (v02 * ((v10 * v21) - (v11 * v20))),

            // cofactor
            c00 = m00, c01 = -m01, c02 = m02, c03 = -m03,
            c10 = -m10, c11 = m11, c12 = -m12, c13 = m13,
            c20 = m20, c21 = -m21, c22 = m22, c23 = -m23,
            c30 = -m30, c31 = m31, c32 = -m32, c33 = m33;

        // transposed cofactor
        return new Mat4([
            c00, c10, c20, c30,
            c01, c11, c21, c31,
            c02, c12, c22, c32,
            c03, c13, c23, c33
        ]);
    }

    /**
     * Translate a Mat4 by a Vec3 along the x, y and z axes
     *
     * @param m the Mat4 to translate
     * @param translate the translation vector
     *
     * @returns the translated Mat4
     */
    public static translate(m: Mat4, translate: Vec3): Mat4 {
        const v = m.array,

            { x, y, z } = translate,

            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15];

        return new Mat4([
            v00, v01, v02, v03,
            v10, v11, v12, v13,
            v20, v21, v22, v23,
            // r30
            x * v00 + y * v10 + z * v20 + v30,
            // r31
            x * v01 + y * v11 + z * v21 + v31,
            // r32
            x * v02 + y * v12 + z * v22 + v32,
            // r33
            x * v03 + y * v13 + z * v23 + v33
        ]);
    }

    // TODO find good learning resource
    // /**
    //  * Rotate a Mat4 by a given angle (radians) around the axis, given as a Vec3
    //  *
    //  * @param m the Mat4 to rotate
    //  * @param angle the angle to rotate by
    //  * @param axisVector the axis to rotate around
    //  *
    //  * @returns the rotated Mat4
    //  */
    // public static rotate(m: Mat4, angle: number, axisVector: Vec3): Mat4 {
    //     const v = m.array,

    //         { x, y, z } = axisVector,

    //         v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
    //         v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
    //         v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
    //         v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15];


    //     return new Mat4([
    //         1, 0, 0, 0,
    //         0, 1, 0, 0,
    //         0, 0, 1, 0,
    //         0, 0, 0, 1
    //     ]);
    // }

    /**
     * Scale a Mat4 by factors on the x, y and z axes, given as a Vec3
     *
     * @param m the Mat4 to scale
     * @param factor the axis factors to scale by
     *
     * @returns the scaled Mat4
     */
    public static scale(m: Mat4, factor: Vec3): Mat4 {
        const v = m.array,

            { x, y, z } = factor,

            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15];

        return new Mat4([
            x * v00, x * v01, x * v02, x * v03,
            y * v10, y * v11, y * v12, y * v13,
            z * v20, z * v21, z * v22, z * v23,
            v30, v31, v32, v33
        ]);
    }

    /**
     * Constructor. Take and store the Mat4's values
     *
     * @param values the Mat4's values; defaults to Mat4.IDENTITY
     */
    constructor(public readonly array = Mat4.IDENTITY.slice(0)) {
        // TODO ensure values is a 4x4 matrix
    }

    /**
     * Getter for the Mat4's determinant
     */
    public get determinant(): number {
        const v = this.array,

            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15],

            // determinants of submatrices for v00, v01, v02, v03
            // using standard method for 3x3 determinants
            sub00 = v11 * ((v22 * v33) - (v23 * v32)) - v12 * ((v21 * v33) - (v23 * v31)) + v13 * ((v21 * v32) - (v22 * v31)),
            sub01 = v10 * ((v22 * v33) - (v23 * v32)) - v12 * ((v20 * v33) - (v23 * v30)) + v13 * ((v20 * v32) - (v22 * v30)),
            sub02 = v10 * ((v21 * v33) - (v23 * v31)) - v11 * ((v20 * v33) - (v23 * v30)) + v13 * ((v20 * v31) - (v21 * v30)),
            sub03 = v10 * ((v21 * v32) - (v22 * v31)) - v11 * ((v20 * v32) - (v22 * v30)) + v12 * ((v20 * v31) - (v21 * v30));

        // det(4x4) => 00 . det(sub00)  -  01 . det(sub01)  +  02 . det(sub02)  -  03 . det(sub03)
        return v00 * sub00 - v01 * sub01 + v02 * sub02 - v03 * sub03;
    }

    /**
     * Getter for the Mat4's forward vector
     */
    public get forwardVector(): Vec3 {
        return new Vec3(this.array[8], this.array[9], this.array[10]);
    }

    /**
     * Getter for the Mat4's forward vector
     */
    public get rightVector(): Vec3 {
        return new Vec3(this.array[0], this.array[1], this.array[2]);
    }

    /**
     * Getter for the Mat4's up vector
     */
    public get upVector(): Vec3 {
        return new Vec3(this.array[4], this.array[5], this.array[6]);
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
        const v = this.array;

        return `Mat4\n${v[0]} ${v[1]} ${v[2]} ${v[3]}\n${v[4]} ${v[5]} ${v[6]} ${v[7]}\n${v[8]} ${v[9]} ${v[10]} ${v[11]}\n${v[12]} ${v[13]} ${v[14]} ${v[15]}`;
    }

    /**
     * Reset the Mat4's values to match the identity matrix
     */
    public reset(): void {
        this.mutable.array = Mat4.IDENTITY.slice(0);
    }

    /**
     * Clone the Mat4
     *
     * @returns a new Mat4 with the same values as this one
     */
    public clone(): Mat4 {
        // TODO test whether or not the slice is necessary here
        return new Mat4(this.array.slice(0));
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
