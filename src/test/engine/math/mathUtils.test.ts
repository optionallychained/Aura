import { MathUtils, Vec3 } from '../../../engine/protogl';

/**
 * Tests for class MathUtils
 */
describe('MathUtils', () => {

    /**
     * Tests for angle-related methods
     */
    describe('angles', () => {

        /**
         * Tests for MathUtils.degToRad()
         */
        describe('degToRad', () => {
            it('should convert degrees to radians correctly', () => {
                const deg = 36;
                const rad = Math.PI / 180;

                const degToRad = MathUtils.degToRad(deg);

                expect(degToRad).toBe(deg * rad);
            });
        });

        /**
         * Tests for MathUtils.radToDeg()
         */
        describe('radToDeg', () => {
            it('should convert radians to degrees correctly', () => {
                const rad = 2.4;
                const deg = 180 / Math.PI;

                const radToDeg = MathUtils.radToDeg(rad);

                expect(radToDeg).toBe(rad * deg);
            });
        })
    });

    /**
     * Tests for color-related methods
     */
    describe('colors', () => {

        /**
         * Tests for MathUtils.rgbToHex()
         */
        describe('rgbToHex', () => {
            it('should convert RGB to Hex correctly', () => {
                const rgb = new Vec3(150, 250, 75);
                const knownHex = '#96fa4b';

                const rgbToHex = MathUtils.rgbToHex(rgb);

                expect(rgbToHex).toBe(knownHex);
            });
        });
    });

    /**
     * Tests for misc methods
     */
    describe('misc', () => {

        /**
         * Tests for MathUtils.randomBetween()
         */
        describe('randomBetween', () => {
            it('should clamp random values correctly', (done) => {
                const min = 1.5, max = 3, iterations = 1000;

                // TODO is there a way to do this less...haphazardly?
                // deterministically maybe?
                for (let i = 0; i < iterations; i++) {
                    const random = MathUtils.randomBetween(min, max);

                    expect(random).toBeGreaterThanOrEqual(min);
                    expect(random).toBeLessThan(max);
                }

                done();
            });
        });
    });
});
