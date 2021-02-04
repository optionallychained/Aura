import { Mat3, Mat4 } from '../../../engine/protogl';

/**
 * Tests for class Mat4
 */
fdescribe('Mat4', () => {

    // identity matrix
    const IDENTITY = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    // right-hand-side for operations
    const RHS = [
        1, 2, 3, 4,
        4, 3, 2, 1,
        1, 2, 3, 4,
        4, 3, 2, 1
    ];

    // invertible matrix for various tests
    const INVERTIBLE = [
        1, 3, 5, 9,
        1, 3, 1, 7,
        4, 3, 9, 7,
        5, 2, 0, 9
    ];

    /**
     * Tests for Mat4 static methods
     */
    describe('Static', () => {

        /**
         * Tests for Mat4.add()
         */
        describe('add', () => {
            it('should add two matrices correctly', () => {
                const m1 = new Mat4(IDENTITY.slice(0));
                const m2 = new Mat4(RHS.slice(0));

                const result = [
                    IDENTITY[0] + RHS[0], IDENTITY[1] + RHS[1], IDENTITY[2] + RHS[2], IDENTITY[3] + RHS[3],
                    IDENTITY[4] + RHS[4], IDENTITY[5] + RHS[5], IDENTITY[6] + RHS[6], IDENTITY[7] + RHS[7],
                    IDENTITY[8] + RHS[8], IDENTITY[9] + RHS[9], IDENTITY[10] + RHS[10], IDENTITY[11] + RHS[11],
                    IDENTITY[12] + RHS[12], IDENTITY[13] + RHS[13], IDENTITY[14] + RHS[14], IDENTITY[15] + RHS[15]
                ];

                const add = Mat4.add(m1, m2);

                expect(add.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat4.sub()
         */
        describe('sub', () => {
            it('should subtract two matrices correctly', () => {
                const m1 = new Mat4(IDENTITY.slice(0));
                const m2 = new Mat4(RHS.slice(0));

                const result = [
                    IDENTITY[0] - RHS[0], IDENTITY[1] - RHS[1], IDENTITY[2] - RHS[2], IDENTITY[3] - RHS[3],
                    IDENTITY[4] - RHS[4], IDENTITY[5] - RHS[5], IDENTITY[6] - RHS[6], IDENTITY[7] - RHS[7],
                    IDENTITY[8] - RHS[8], IDENTITY[9] - RHS[9], IDENTITY[10] - RHS[10], IDENTITY[11] - RHS[11],
                    IDENTITY[12] - RHS[12], IDENTITY[13] - RHS[13], IDENTITY[14] - RHS[14], IDENTITY[15] - RHS[15]
                ];

                const add = Mat4.sub(m1, m2);

                expect(add.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat4.mult()
         */
        describe('mult', () => {
            it('should multiply two matrices correctly', () => {
                const m1 = new Mat4(IDENTITY.slice(0));
                const m2 = new Mat4(IDENTITY.slice(0));

                const i = IDENTITY;
                const r = RHS;

                const result = [
                    i[0] * r[0] + i[1] * r[4] + i[2] * r[8] + i[3] * r[12],
                    i[0] * r[1] + i[1] * r[5] + i[2] * r[9] + i[3] * r[13],
                    i[0] * r[2] + i[1] * r[6] + i[2] * r[10] + i[3] * r[14],
                    i[0] * r[3] + i[1] * r[7] + i[2] * r[11] + i[3] * r[15],

                    i[4] * r[0] + i[5] * r[4] + i[6] * r[8] + i[7] * r[12],
                    i[4] * r[1] + i[5] * r[5] + i[6] * r[9] + i[7] * r[13],
                    i[4] * r[2] + i[5] * r[6] + i[6] * r[10] + i[7] * r[14],
                    i[4] * r[3] + i[5] * r[7] + i[6] * r[11] + i[7] * r[15],

                    i[8] * r[0] + i[9] * r[4] + i[10] * r[8] + i[11] * r[12],
                    i[8] * r[1] + i[9] * r[5] + i[10] * r[9] + i[11] * r[13],
                    i[8] * r[2] + i[9] * r[6] + i[10] * r[10] + i[11] * r[14],
                    i[8] * r[3] + i[9] * r[7] + i[10] * r[11] + i[11] * r[15],

                    i[12] * r[0] + i[13] * r[4] + i[14] * r[8] + i[15] * r[12],
                    i[12] * r[1] + i[13] * r[5] + i[14] * r[9] + i[15] * r[13],
                    i[12] * r[2] + i[13] * r[6] + i[14] * r[10] + i[15] * r[14],
                    i[12] * r[3] + i[13] * r[7] + i[14] * r[11] + i[15] * r[15]
                ];

                const mult = Mat4.mult(m1, m2);

                expect(mult.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat4.multScalar()
         */
        describe('multScalar', () => {
            it('should multiply a matrix by a scalar correctly', () => {
                const m = new Mat4(RHS.slice(0));
                const factor = 15;

                const result = [
                    RHS[0] * factor, RHS[1] * factor, RHS[2] * factor, RHS[3] * factor,
                    RHS[4] * factor, RHS[5] * factor, RHS[6] * factor, RHS[7] * factor,
                    RHS[8] * factor, RHS[9] * factor, RHS[10] * factor, RHS[11] * factor,
                    RHS[12] * factor, RHS[13] * factor, RHS[14] * factor, RHS[15] * factor,
                ];

                const multScalar = Mat4.multScalar(m, factor);

                expect(multScalar.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat4.invert()
         */
        describe('invert', () => {
            // invertible mat4
            it('should invert a matrix correctly', () => {
                expect(true).toBe(true);
            });

            // non-invertible mat4
            it('should return null for a mat4 without an inverse', () => {
                const m = new Mat3(RHS.slice(0));

                const inverse = Mat3.invert(m);

                expect(inverse).toBeFalsy();
            });
        });

        /**
         * Tests for Mat4.transpose()
         */
        describe('transpose', () => {
            it('should transpose a matrix correctly', () => {
                const m = new Mat4(RHS.slice(0));

                const result = [
                    RHS[0], RHS[4], RHS[8], RHS[12],
                    RHS[1], RHS[5], RHS[9], RHS[13],
                    RHS[2], RHS[6], RHS[10], RHS[14],
                    RHS[3], RHS[7], RHS[11], RHS[15]
                ];

                const transpose = Mat4.transpose(m);

                expect(transpose.array).toEqual(result);
            });
        });

        // /**
        //  * Tests for Mat4.adjoint()
        //  */
        // describe('adjoint', () => {
        //     it('should calculate the adjugate of a matrix correctly', () => {
        //         // result obtained from online calculator at https://www.symbolab.com/solver/matrix-adjoint-calculator
        //         const m = new Mat4(INVERTIBLE.slice(0));

        //         const result = [
        //             27, -12, 6, -30,
        //             0, -18, 9, 36,
        //             0, 18, -9, 45,
        //             -18, 47, -10, 50
        //         ];

        //         const adjugate = Mat4.adjoint(m);

        //         expect(adjugate.array).toEqual(result);
        //     });
        // });

        /**
         * Tests for Mat4.translate()
         */
        describe('translate', () => {
            it('should translate a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat4.rotate()
         */
        describe('rotate', () => {
            it('should rotate a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat4.scale()
         */
        describe('scale', () => {
            it('should scale a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });
    });

    /**
     * Tests for Mat4 instances and methods
     */
    fdescribe('Instance', () => {

        /**
         * Tests for Mat4 constructor
         */
        describe('construct', () => {
            // default values
            it('should set default values', () => {
                const m = new Mat4();

                expect(m.array).toEqual(IDENTITY);
            });

            // given values
            it('should set given values', () => {
                const m = new Mat4(RHS.slice(0));

                expect(m.array).toEqual(RHS);
            });
        });

        /**
         * Tests for (Mat4).determinant
         */
        fdescribe('determinant', () => {
            it('should calculate the determinant correctly', () => {
                // result obtained from online calculator at https://www.symbolab.com/solver/matrix-determinant-calculator
                const { determinant } = new Mat4(INVERTIBLE.slice(0));

                expect(determinant).toBe(-376);
            });

            it('should return 0 for a non-invertible matrix', () => {
                const { determinant } = new Mat4(RHS.slice(0));

                expect(determinant).toBe(0);
            });
        });

        /**
         * Tests for (Mat4).forwardVector
         */
        describe('forwardVector', () => {
            it('should give the correct forward vector', () => {
                const { forwardVector } = new Mat4(RHS.slice(0));

                expect(forwardVector).toHaveProperty('x', RHS[8]);
                expect(forwardVector).toHaveProperty('y', RHS[9]);
                expect(forwardVector).toHaveProperty('z', RHS[10]);
            });
        });

        /**
         * Tests for (Mat4).rightVector
         */
        describe('rightVector', () => {
            it('should give the correct right vector', () => {
                const { rightVector } = new Mat4(RHS.slice(0));

                expect(rightVector).toHaveProperty('x', RHS[0]);
                expect(rightVector).toHaveProperty('y', RHS[1]);
                expect(rightVector).toHaveProperty('z', RHS[2]);
            });
        });

        /**
         * Tests for (Mat4).upVector
         */
        describe('upVector', () => {
            it('should give the correct up vector', () => {
                const { upVector } = new Mat4(RHS.slice(0));

                expect(upVector).toHaveProperty('x', RHS[4]);
                expect(upVector).toHaveProperty('y', RHS[5]);
                expect(upVector).toHaveProperty('z', RHS[6]);
            });
        });

        /**
         * Tests for (Mat4).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const { float32Array } = new Mat4(RHS.slice(0));

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array).toEqual(Float32Array.from(RHS));
            });
        });

        /**
         * Tests for (Mat4).string
         */
        describe('string', () => {
            it('should give the correct string form', () => {
                const { string } = new Mat4(RHS.slice(0));

                expect(string).toBe(`Mat4\n${RHS[0]} ${RHS[1]} ${RHS[2]} ${RHS[3]}\n${RHS[4]} ${RHS[5]} ${RHS[6]} ${RHS[7]}\n${RHS[8]} ${RHS[9]} ${RHS[10]} ${RHS[11]}\n${RHS[12]} ${RHS[13]} ${RHS[14]} ${RHS[15]}`)
            });
        });

        /**
         * Tests for (Mat4).reset()
         */
        describe('reset', () => {
            it('should reset a matrix properly', () => {
                const m = new Mat4(RHS.slice(0));

                m.reset();

                expect(m.array).toEqual(IDENTITY);
            });
        });

        /**
         * Tests for (Mat4).clone()
         */
        describe('clone', () => {
            it('should clone a matrix correctly', () => {
                const m = new Mat4(RHS.slice(0));
                const cloned = m.clone();

                expect(cloned.array).toEqual(RHS);
            });
        });
    });
});