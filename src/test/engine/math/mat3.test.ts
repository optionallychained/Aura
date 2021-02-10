import { Mat3, Vec2 } from '../../../engine';

/**
 * Tests for class Mat3
 */
describe('Mat3', () => {

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

    // invertible matrix for various tests
    const INVERTIBLE = [
        3, 0, 2,
        2, 0, -2,
        0, 1, 1
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
            // invertible mat3
            it('should invert a matrix correctly', () => {
                // result obtained from online calculator at https://www.symbolab.com/solver/matrix-inverse-calculator
                const m = new Mat3(INVERTIBLE.slice(0));

                const result = [
                    0.2, 0.2, 0,
                    -0.2, 0.3, 1,
                    0.2, -0.3, 0
                ];

                const inverse = Mat3.invert(m);

                expect(inverse).toBeTruthy();

                for (let i = 0; i < result.length; i++) {
                    expect(inverse!.array[i]).toBeCloseTo(result[i]);
                }
            });

            // non-invertible mat3
            it('should return null for a mat3 without an inverse', () => {
                const m = new Mat3(RHS.slice(0));

                const inverse = Mat3.invert(m);

                expect(inverse).toBeFalsy();
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
                // result obtained from online calculator at https://www.symbolab.com/solver/matrix-adjoint-calculator
                const m = new Mat3(RHS.slice(0));

                // -0s because Jest doesn't like comparing 0 to -0
                // safe to ignore 0-sign for general use because (-0 === 0) => true
                const result = [
                    4, -0, -4,
                    -8, 0, 8,
                    4, -0, -4
                ];

                const adjugate = Mat3.adjoint(m);

                expect(adjugate.array).toEqual(result)
            });
        });

        /**
         * Tests for Mat3.translate()
         */
        describe('translate', () => {
            it('should translate a matrix correctly', () => {
                const m = new Mat3(RHS.slice(0));
                const x = 78, y = -68;

                const result = [
                    RHS[0], RHS[1], RHS[2],
                    RHS[3], RHS[4], RHS[5],

                    x * RHS[0] + y * RHS[3] + RHS[6],

                    x * RHS[1] + y * RHS[4] + RHS[7],

                    x * RHS[2] + y * RHS[5] + RHS[8]
                ];

                const translate = Mat3.translate(m, new Vec2(x, y));

                expect(translate.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.rotate()
         */
        describe('rotate', () => {
            it('should rotate a matrix correctly', () => {
                const m = new Mat3(RHS.slice(0));
                const angle = 2.4, cos = Math.cos(angle), sin = Math.sin(angle);

                const result = [
                    cos * RHS[0] + sin * RHS[3],
                    cos * RHS[1] + sin * RHS[4],
                    cos * RHS[2] + sin * RHS[5],

                    cos * RHS[3] - sin * RHS[0],
                    cos * RHS[4] - sin * RHS[1],
                    cos * RHS[5] - sin * RHS[2],

                    RHS[6], RHS[7], RHS[8]
                ];

                const rotate = Mat3.rotate(m, angle);

                expect(rotate.array).toEqual(result);
            });
        });

        /**
         * Tests for Mat3.scale()
         */
        describe('scale', () => {
            it('should scale a matrix correctly', () => {
                const m = new Mat3(RHS.slice(0));
                const x = 78, y = -68;

                const result = [
                    x * RHS[0], x * RHS[1], x * RHS[2],
                    y * RHS[3], y * RHS[4], y * RHS[5],

                    RHS[6], RHS[7], RHS[8]
                ];

                const scale = Mat3.scale(m, new Vec2(x, y));

                expect(scale.array).toEqual(result);
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
                // result obtained from online calculator at https://www.symbolab.com/solver/matrix-determinant-calculator
                const { determinant } = new Mat3(INVERTIBLE.slice(0));

                expect(determinant).toBe(10);
            });

            it('should return 0 for a non-invertible matrix', () => {
                const { determinant } = new Mat3(RHS.slice(0));

                expect(determinant).toBe(0);
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

                expect(string).toBe(`Mat3\n${RHS[0]} ${RHS[1]} ${RHS[2]}\n${RHS[3]} ${RHS[4]} ${RHS[5]}\n${RHS[6]} ${RHS[7]} ${RHS[8]}\n`);
            });
        });

        /**
         * Tests for (Mat3).reset()
         */
        describe('reset', () => {
            it('should reset a matrix properly', () => {
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
