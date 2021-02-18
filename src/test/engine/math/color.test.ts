import { Color } from '../../../engine';

/**
 * Tests for class Color
 */
describe('Color', () => {

    /**
     * Tests for Color static methods
     */
    describe('Static', () => {

        /**
         * Tests for Color.random()
         */
        describe('random', () => {
            it('should generate random colors with fixed alphas', () => {
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
        });

        /**
         * Tests for Color.randomWithAlpha()
         */
        describe('randomWithAlpha', () => {
            it('should generate random colors with random alphas', () => {
                const color = Color.randomWithAlpha();

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
         * Tests for Color.fromHex()
         */
        describe('fromHex', () => {

            /**
             * Tests for long-form hexes
             */
            describe('long hexes', () => {
                // form #000000
                it('should convert the form #000000 correctly', () => {
                    const color = Color.fromHex('#332255');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });

                // form 000000
                it('should convert the form 000000 correctly', () => {
                    const color = Color.fromHex('332255');

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
                    const color = Color.fromHex('#325');

                    expect(color).toHaveProperty('r', 51);
                    expect(color).toHaveProperty('g', 34);
                    expect(color).toHaveProperty('b', 85);
                });

                // form 000
                it('should convert the form 000 correctly', () => {
                    const color = Color.fromHex('325');

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
                    const color = Color.fromHex('3');

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                });

                // too long
                it('should set default values for too-long hexes', () => {
                    const color = Color.fromHex('3333333');

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
                    const color = Color.fromHex('ZFF');

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
         * Tests for Color constructor
         */
        describe('construct', () => {

            /**
             * Tests for valid values
             */
            describe('valid values', () => {
                // default values
                it('should set default values', () => {
                    const color = new Color();

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                    expect(color).toHaveProperty('a', 1);
                });

                // given values
                it('should set given values', () => {
                    const r = 50, g = 100, b = 255, a = 0.5;

                    const color = new Color(r, g, b, a);

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
                    const color = new Color(r, g, b, a);

                    expect(color).toHaveProperty('r', 255);
                    expect(color).toHaveProperty('g', 255);
                    expect(color).toHaveProperty('b', 255);
                    expect(color).toHaveProperty('a', 1);
                });

                // negative
                it('should set default values for negatives', () => {
                    const color = new Color(-r, -g, -b, -a);

                    expect(color).toHaveProperty('r', 0);
                    expect(color).toHaveProperty('g', 0);
                    expect(color).toHaveProperty('b', 0);
                    expect(color).toHaveProperty('a', 0);
                });
            });
        });

        /**
         * Tests for (Color).hex
         */
        describe('hex', () => {
            // nominal test
            it('should give the correct hex form', () => {
                const color = new Color(150, 250, 75);
                const knownHex = '#96fa4b';

                expect(color.hex).toBe(knownHex);
            });

            // cover low RGB value '0' prepends
            it('should prepend hex components properly', () => {
                const color = new Color(1, 2, 3);
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

                const { float32Array } = new Color(r, g, b, a);

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
