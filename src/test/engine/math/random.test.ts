import { Random } from '../../../engine';

/**
 * Tests for class Random
 */
describe('Random', () => {

    /**
     * Tests for Random.between()
     */
    describe('between', () => {
        it('should clamp random values correctly', (done) => {
            const min = 1, max = 2, iterations = 1000;

            for (let i = 0; i < iterations; i++) {
                const random = Random.between(min, max);

                expect(random).toBeGreaterThanOrEqual(min);
                expect(random).toBeLessThan(max);
            }

            done();
        });
    });
});
