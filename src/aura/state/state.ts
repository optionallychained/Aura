import { Game2D } from '../core/2d/game.2d';
import { Game3D } from '../core/3d/game.3d';
import { StateConfig } from './state.config';

/**
 * Abstract class representing a State, broken down into concrete 2D and 3D variants in State2D and State3D
 *
 * A State is roughly equivalent to a Scene; a literal distinct *state* that the game can be in
 *
 * Example States may include Menu, Game, Pause, Dead, etc
 *
 * The typeparam specifies which concrete Game type the State belongs to, allowing for the concrete State2D and State3D to receive a
 *   type-correct Game instance in their lifecycle methods, and enabling the assurance that a Game is only configured with the corresponding
 *   2D or 3D State type
 *
 * @typeparam TGame the concrete Game Type the State belongs to
 */
export abstract class State<TGame extends Game2D | Game3D> {

    /**
     * Constructor. Take and store the State's config
     *
     * @param config the State's configuration
     */
    constructor(protected readonly config: StateConfig<TGame>) { }

    /**
     * Getter for the State's name, as provided in its Config
     *
     * @returns the State's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Generic init lifecycle method, calling down to the init() provided in the State's config
     *
     * Called when the State is switched to, facilitating State initialisation
     *
     * @param game the game the State is running within
     */
    public init(game: TGame): void {
        this.config.init?.(game);
    }

    /**
     * Generic tick lifecycle method, calling down to the tick() provided in the State's config
     *
     * Called once per frame as an update routine, facilitating State frame logic
     *
     * @param game the game the State is running within
     * @param frameDelta the Game's frameDelta for normalizing time-dependent operations
     */
    public tick(game: TGame, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    /**
     * Generic end lifecycle method, calling down to the end() provided in the State's config
     *
     * Called when the State is switched away from, facilitating State cleanup
     *
     * @param game the game the State is running within
     */
    public end(game: TGame): void {
        this.config.end?.(game);
    }
}
