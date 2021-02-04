import { Mat3 } from '../../../engine/protogl';

/**
 * Tests for class Mat3
 */
fdescribe('Mat3', () => {

    // identity matrix
    const IDENTITY = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    // right-hand-side for operations
    const RHS = [
        1, 2, 3,
        3, 2, 1,
        1, 2, 3
    ];

    /**
     * Tests for Mat3 static methods
     */
    describe('Static', () => {

        /**
         * Tests for Mat3.add()
         */
        describe('add', () => {
            it('should add two matrices correctly', () => {
                const m1 = new Mat3(IDENTITY.slice(0));
                const m2 = new Mat3(RHS.slice(0));

                const result = [
                    IDENTITY[0] + RHS[0], IDENTITY[1] + RHS[1], IDENTITY[2] + RHS[2],
                    IDENTITY[3] + RHS[3], IDENTITY[4] + RHS[4], IDENTITY[5] + RHS[5],
                    IDENTITY[6] + RHS[6], IDENTITY[7] + RHS[7], IDENTITY[8] + RHS[8]
                ];

                const add = Mat3.add(m1, m2);

                expect(add.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.sub()
         */
        describe('sub', () => {
            it('should subtract two matrices correctly', () => {
                const m1 = new Mat3(IDENTITY.slice(0));
                const m2 = new Mat3(RHS.slice(0));

                const result = [
                    IDENTITY[0] - RHS[0], IDENTITY[1] - RHS[1], IDENTITY[2] - RHS[2],
                    IDENTITY[3] - RHS[3], IDENTITY[4] - RHS[4], IDENTITY[5] - RHS[5],
                    IDENTITY[6] - RHS[6], IDENTITY[7] - RHS[7], IDENTITY[8] - RHS[8]
                ];

                const sub = Mat3.sub(m1, m2);

                expect(sub.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.mult()
         */
        describe('mult', () => {
            it('should multiply two matrices correctly', () => {
                const m1 = new Mat3(IDENTITY.slice(0));
                const m2 = new Mat3(RHS.slice(0));

                const i = IDENTITY;
                const r = RHS;

                const result = [
                    i[0] * r[0] + i[1] * r[3] + i[2] * r[6],
                    i[0] * r[1] + i[1] * r[4] + i[2] * r[7],
                    i[0] * r[2] + i[1] * r[5] + i[2] * r[8],

                    i[3] * r[0] + i[4] * r[3] + i[5] * r[6],
                    i[3] * r[1] + i[4] * r[4] + i[5] * r[7],
                    i[3] * r[2] + i[4] * r[5] + i[5] * r[8],

                    i[6] * r[0] + i[7] * r[3] + i[8] * r[6],
                    i[6] * r[1] + i[7] * r[4] + i[8] * r[7],
                    i[6] * r[2] + i[7] * r[5] + i[8] * r[8]
                ];

                const mult = Mat3.mult(m1, m2);

                expect(mult.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.multScalar()
         */
        describe('multScalar', () => {
            it('should multiply a matrix by a scalar correctly', () => {
                const m = new Mat3(RHS.slice(0));
                const factor = 15;

                const result = [
                    RHS[0] * factor, RHS[1] * factor, RHS[2] * factor,
                    RHS[3] * factor, RHS[4] * factor, RHS[5] * factor,
                    RHS[6] * factor, RHS[7] * factor, RHS[8] * factor
                ];

                const multScalar = Mat3.multScalar(m, factor);

                expect(multScalar.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.invert()
         */
        describe('invert', () => {
            it('should invert a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat3.transpose()
         */
        describe('transpose', () => {
            it('should transpose a matrix correctly', () => {
                const m = new Mat3(RHS.slice(0));

                const result = [
                    RHS[0], RHS[3], RHS[6],
                    RHS[1], RHS[4], RHS[7],
                    RHS[2], RHS[5], RHS[8]
                ];

                const transpose = Mat3.transpose(m);

                expect(transpose.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.adjoint()
         */
        describe('adjoint', () => {
            it('should calculate the adjugate of a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat3.translate()
         */
        describe('translate', () => {
            it('should translate a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat3.rotate()
         */
        describe('rotate', () => {
            it('should rotate a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for Mat3.scale()
         */
        describe('scale', () => {
            it('should scale a matrix correctly', () => {
                expect(true).toBe(true);
            });
        });
    });

    /**
     * Tests for Mat3 instances and methods
     */
    describe('Instance', () => {

        /**
         * Tests for Mat3 constructor
         */
        describe('construct', () => {
            // default values
            it('should set default values', () => {
                const m = new Mat3();

                expect(m.array).toEqual(IDENTITY);
            });

            // given values
            it('should set given values', () => {
                const m = new Mat3(RHS.slice(0));

                expect(m.array).toEqual(RHS);
            });
        });

        /**
         * Tests for (Mat3).determinant
         */
        describe('determinant', () => {
            it('should calculate the determinant correctly', () => {
                expect(true).toBe(true);
            });
        });

        /**
         * Tests for (Mat3).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const { float32Array } = new Mat3(RHS.slice(0));

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array).toEqual(Float32Array.from(RHS));
            });
        });

        /**
         * Tests for (Mat3).string
         */
        describe('string', () => {
            it('should give the correct string form', () => {
                const { string } = new Mat3(RHS.slice(0));

                expect(string).toBe(`Mat3(\n${RHS[0]} , ${RHS[1]} , ${RHS[2]} ,\n${RHS[3]} , ${RHS[4]} , ${RHS[5]} ,\n${RHS[6]} , ${RHS[7]} , ${RHS[8]}\n)`);
            });
        });

        /**
         * Tests for (Mat3).set()
         */
        describe('reset', () => {
            // default values
            it('should reset the mat3 properly', () => {
                const m = new Mat3(RHS.slice(0));

                m.reset();

                expect(m.array).toEqual(IDENTITY);
            });
        });

        /**
         * Tests for (Mat3).clone()
         */
        describe('clone', () => {
            it('should clone a matrix correctly', () => {
                const m = new Mat3(RHS.slice(0));
                const cloned = m.clone();

                expect(cloned.array).toEqual(RHS);
            });
        });
    });
})
