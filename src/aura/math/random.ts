/**
 * Utility class for generating random numbers
 */
export class Random {

    /**
     * Generate a random float between two given values
     *
     * @param min the minimum number (inclusive)
     * @param max the maximum number (exclusive)
     *
     * @returns the random float
     */
    public static between(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
