import { Angle } from '../../../aura/math/angle';

/**
 * Tests for class Angle
 */
describe('Angle', () => {

    /**
     * Tests for Angle.toRadians()
     */
    describe('toRadians', () => {
        it('should convert degrees to radians correctly', () => {
            const deg = 36;
            const rad = Math.PI / 180;

            const result = Angle.toRadians(deg);

            expect(result).toBe(deg * rad);
        });
    });

    /**
     * Tests for Angle.toDegrees()
     */
    describe('toDegrees', () => {
        it('should convert radians to degrees correctly', () => {
            const rad = 2.4;
            const deg = 180 / Math.PI;

            const result = Angle.toDegrees(rad);

            expect(result).toBe(rad * deg);
        });
    });
});
