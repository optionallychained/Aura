import { Color } from '../../../aura/math/color';

/**
 * Tests for class Color
 */
describe('Color', () => {

    /**
     * Tests for Color static methods
     */
    describe('Static', () => {

        // TODO color methods

        /**
         * Tests for Color.random()
         */
        describe('random', () => {
            // default fixed alpha
            it('should generate a random color with default fixed alpha', () => {
                const color = Color.random();

                expect(color).toHaveProperty('r');
                expect(color.r).toBeGreaterThanOrEqual(0);
                expect(color.r).toBeLessThan(255);

                expect(color).toHaveProperty('g');
                expect(color.g).toBeGreaterThanOrEqual(0);
                expect(color.g).toBeLessThan(255);

                expect(color).toHaveProperty('b');
                expect(color.b).toBeGreaterThanOrEqual(0);
                expect(color.b).toBeLessThan(255);

                expect(color).toHaveProperty('a', 1);
            });

            // given fixed alpha
            it('should generate a random color with given fixed alpha', () => {
                const color = Color.random(false, 0.5);

                expect(color).toHaveProperty('r');
                expect(color.r).toBeGreaterThanOrEqual(0);
                expect(color.r).toBeLessThan(255);

                expect(color).toHaveProperty('g');
                expect(color.g).toBeGreaterThanOrEqual(0);
                expect(color.g).toBeLessThan(255);

                expect(color).toHaveProperty('b');
                expect(color.b).toBeGreaterThanOrEqual(0);
                expect(color.b).toBeLessThan(255);

                expect(color).toHaveProperty('a', 0.5);
            });

            // random alpha
            it('should generate a random color with random alpha', () => {
                const color = Color.random(true);

                expect(color).toHaveProperty('r');
                expect(color.r).toBeGreaterThanOrEqual(0);
                expect(color.r).toBeLessThan(255);

                expect(color).toHaveProperty('g');
                expect(color.g).toBeGreaterThanOrEqual(0);
                expect(color.g).toBeLessThan(255);

                expect(color).toHaveProperty('b');
                expect(color.b).toBeGreaterThanOrEqual(0);
                expect(color.b).toBeLessThan(255);

                expect(color).toHaveProperty('a');
                expect(color.a).toBeGreaterThanOrEqual(0);
                expect(color.a).toBeLessThan(1);
            });
        });

        /**
         * Tests for Color.randomList()
         */
        describe('randomList', () => {
            // default fixed alpha
            it('should generate a list of random colors with default fixed alphas', () => {
                const colors = Color.randomList(5);

                expect(Array.isArray(colors)).toBeTruthy();
                expect(colors.length).toBe(5);

                for (const color of colors) {
                    expect(color).toHaveProperty('r');
                    expect(color.r).toBeGreaterThanOrEqual(0);
                    expect(color.r).toBeLessThan(255);

                    expect(color).toHaveProperty('g');
                    expect(color.g).toBeGreaterThanOrEqual(0);
                    expect(color.g).toBeLessThan(255);

                    expect(color).toHaveProperty('b');
                    expect(color.b).toBeGreaterThanOrEqual(0);
                    expect(color.b).toBeLessThan(255);

                    expect(color).toHaveProperty('a', 1);
                }
            });

            // given fixed alph
            it('should generate a list of random colors with given fixed alphas', () => {
                const colors = Color.randomList(3, false, 0.5);

                expect(Array.isArray(colors)).toBeTruthy();
                expect(colors.length).toBe(3);

                for (const color of colors) {
                    expect(color).toHaveProperty('r');
                    expect(color.r).toBeGreaterThanOrEqual(0);
                    expect(color.r).toBeLessThan(255);

                    expect(color).toHaveProperty('g');
                    expect(color.g).toBeGreaterThanOrEqual(0);
                    expect(color.g).toBeLessThan(255);

                    expect(color).toHaveProperty('b');
                    expect(color.b).toBeGreaterThanOrEqual(0);
                    expect(color.b).toBeLessThan(255);

                    expect(color).toHaveProperty('a', 0.5);
                }
            });

            // random alpha
            it('should generate a list of random colors with random alphas', () => {
                const colors = Color.randomList(8, true);

                expect(Array.isArray(colors)).toBeTruthy();
                expect(colors.length).toBe(8);

                for (const color of colors) {
                    expect(color).toHaveProperty('r');
                    expect(color.r).toBeGreaterThanOrEqual(0);
                    expect(color.r).toBeLessThan(255);

                    expect(color).toHaveProperty('g');
                    expect(color.g).toBeGreaterThanOrEqual(0);
                    expect(color.g).toBeLessThan(255);

                    expect(color).toHaveProperty('b');
                    expect(color.b).toBeGreaterThanOrEqual(0);
                    expect(color.b).toBeLessThan(255);

                    expect(color).toHaveProperty('a');
                    expect(color.a).toBeGreaterThanOrEqual(0);
                    expect(color.a).toBeLessThan(1);
                }
            });
        });

        /**
         * Tests for Color.rgba()
         */
        describe('rgba', () => {

            /**
             * Tests for valid values
             */
            describe('valid values', () => {
                // default values
                it('should set default values', () => {
                    const color = Color.rgba();

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                    expect(color).toHaveProperty('a', 1);
                });

                // given values
                it('should set given values', () => {
                    const r = 50, g = 100, b = 255, a = 0.5;

                    const color = Color.rgba(r, g, b, a)

                    expect(color).toHaveProperty('r', r);
                    expect(color).toHaveProperty('g', g);
                    expect(color).toHaveProperty('b', b);
                    expect(color).toHaveProperty('a', a);
                });
            });

            /**
             * Tests for invalid values
             */
            describe('invalid values', () => {
                const r = 500, g = 600, b = 700, a = 10;

                // too large
                it('should clamp large values correctly', () => {
                    const color = Color.rgba(r, g, b, a);

                    expect(color).toHaveProperty('r', 255);
                    expect(color).toHaveProperty('g', 255);
                    expect(color).toHaveProperty('b', 255);
                    expect(color).toHaveProperty('a', 1);
                });

                // negative
                it('should set default values for negatives', () => {
                    const color = Color.rgba(-r, -g, -b, -a);

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                    expect(color).toHaveProperty('a', 0);
                });
            });
        });

        /**
         * Tests for Color.hex()
         */
        describe('hex', () => {

            /**
             * Tests for long-form hexes
             */
            describe('long hexes', () => {
                // form #000000
                it('should convert the form #000000 correctly', () => {
                    const color = Color.hex('#332255');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });

                // form 000000
                it('should convert the form 000000 correctly', () => {
                    const color = Color.hex('332255');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });
            });

            /**
             * Tests for short-form hexes
             */
            describe('short hexes', () => {
                // form #000
                it('should convert the form #000 correctly', () => {
                    const color = Color.hex('#325');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });

                // form 000
                it('should convert the form 000 correctly', () => {
                    const color = Color.hex('325');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });
            });

            /**
             * Tests for invalid hex lengths
             */
            describe('invalid length', () => {
                // too short
                it('should set default values for too-short hexes', () => {
                    const color = Color.hex('3');

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                });

                // too long
                it('should set default values for too-long hexes', () => {
                    const color = Color.hex('3333333');

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                });
            });

            /**
             * Tests for NaN hex components
             */
            describe('NaN hex components', () => {
                it('should set default values for NaN hex components', () => {
                    const color = Color.hex('ZFF');

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                });
            });
        });
    });

    /**
     * Tests for Color instances and methods
     */
    describe('Instance', () => {

        /**
         * Tests for (Color).hex
         */
        describe('hex', () => {
            // nominal test
            it('should give the correct hex form', () => {
                const color = Color.rgba(150, 250, 75);
                const knownHex = '#96fa4b';

                expect(color.hex).toBe(knownHex);
            });

            // cover low RGB value '0' prepends
            it('should prepend hex components properly', () => {
                const color = Color.rgba(1, 2, 3);
                const knownHex = '#010203';

                expect(color.hex).toBe(knownHex);
            });
        });

        /**
         * Tests for (Color).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const r = 150, g = 250, b = 75, a = 0.25;

                const { float32Array } = Color.rgba(r, g, b, a);

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array.length).toBe(4);
                expect(float32Array[0]).toBeCloseTo(r / 255);
                expect(float32Array[1]).toBeCloseTo(g / 255);
                expect(float32Array[2]).toBeCloseTo(b / 255);
                expect(float32Array[3]).toBeCloseTo(a);
            });
        });
    });
});
