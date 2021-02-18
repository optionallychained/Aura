import { Game } from '../core';

/**
 * Abstract class representing a System; a distinct purposeful processing method that runs on a per-frame basis, operating on Entities to
 *   produce game behavior
 *
 * All States should extend from this class and provide an easy-to-guess and sensible name (eg. PhysicsSystem => 'Physics')
 *
 * Example Systems include Physics and Collision
 *
 * // TODO move away from class extension for Systems in place of a SystemConfig type approach?
 * //   - implementation of Systems becomes a little less naturally-readable, but it fits the approach of the rest of the engine...
 * //   - also consider this for Components
 *
 * @see Game
 * @see PhysicsSystem
 * @see CollisionSystem
 */
export abstract class System {

    /**
     * Constructor. Take and store the System's name
     *
     * @param name the System's name
     */
    constructor(public readonly name: string) { }

    /**
     * Abstract update function called by the Game on a per-frame basis when the System is active. The functional body of the System itself
     *
     * @param game the Game the System is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public abstract tick(game: Game, frameDelta: number): void;
}
