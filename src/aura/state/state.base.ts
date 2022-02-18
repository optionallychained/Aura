import { Game as Game2D } from '../core/2d/game';
import { Game as Game3D } from '../core/3d/game';
import { StateConfig } from './state.config';

/**
 * Abstract State; Aura's analogous concept for a scene - a literal distinct state that a game can be in at any given time
 *
 * Broken down into concrete 2D and 3D variants, providing domain-specific type safety for implementation in 2D and 3D games
 *
 * States comprise an init, end and frame update method. The Game uses these in switching to, switching away from, and maintaining a State
 *
 * Example States may include Menu, Game, Pause, Dead, etc
 *
 * @typeparam Game the specific 2D or 3D Game type the State will operate within
 */
export abstract class StateBase<Game extends Game2D | Game3D> {

    /**
     * Constructor. Take a 2D or 3D StateConfig specifying the State's name and lifecycle methods
     *
     * @param config the StateConfig
     */
    constructor(protected readonly config: StateConfig<Game>) { }

    /**
     * Retrieve the State's name, as provided in its StateConfig
     *
     * @returns the State's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Generic initialisation lifecycle method, calling down to the StateConfig's init() if provided
     *
     * Called by the Game when the State is switched to
     *
     * @param game the 2D or 3D Game the State is operating within
     */
    public init(game: Game): void {
        this.config.init?.(game);
    }

    /**
     * Generic frame update lifecycle method, calling down to the StateConfig's tick()
     *
     * Called by the Game during frame update when the State is active
     *
     * @param game the 2D or 3D Game the State is operating within
     * @param frameDelta the frame delta as calculated by the Game
     */
    public tick(game: Game, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    /**
     * Generic teardown lifecycle method, calling down to the StateConfig's end() if provided
     *
     * Called by the Game when the State is switched away from
     *
     * @param game the 2D or 3D Game the State is operating within
     */
    public end(game: Game): void {
        this.config.end?.(game);
    }
}
