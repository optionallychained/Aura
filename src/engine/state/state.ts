import { Game } from '../core/game';
import { StateConfig } from './state.config';

/**
 * Class representing a State.
 *
 * A State is roughly equivalent to a Scene; a literal distinct *state* that the game can be in.
 *
 * Example States may include Menu, Game, Pause, Dead, etc
 *
 * @see Game
 */
export class State {

    /**
     * Constructor. Take and store the State's config
     *
     * @param config the State's configuration
     */
    constructor(private readonly config: StateConfig) { }

    /**
     * Getter for the State's name, as provided in its Config
     *
     * @returns the State's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * State initialisation method, called when the State is 'switched to' by the Game.
     *
     * Useful for configuring the game with Systems and Entities before State kickoff
     *
     * @param game the Game the State is running within
     */
    public init(game: Game): void {
        this.config.init?.(game);
    }

    /**
     * State frame update method, called for every frame the State is active.
     *
     * Useful for handling per-frame logic necessary to progress the State
     *
     * @param game the Game the State is running within
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    /**
     * State shutdown method, called when the State is 'switched away from' by the Game.
     *
     * Useful for cleaning up Systems and Entities before State closure
     *
     * @param game the Game the State is running within
     */
    public end(game: Game): void {
        this.config.end?.(game);
    }
}
