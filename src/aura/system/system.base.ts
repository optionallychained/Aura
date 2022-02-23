import { Game as Game2D } from '../core/2d/game';
import { Game as Game3D } from '../core/3d/game';

/**
 * Abstract System; a frame update utility representing a distinct functional purpose within a Game
 *
 * Broken down into abstract 2D and 3D variants, allowing for domain-specific extension in type-safe Systems for Aura2D and Aura3D Games
 *
 * Simple examples are found in the built-in Physics and Collision Systems; a more advanced example may be an enemy spawn management System
 *
 * @typeparam Game the specific 2D or 3D Game type the System will operate within
 */
export abstract class SystemBase<Game extends Game2D | Game3D> {

    /**
     * Constructor. Take a name for the System
     *
     * @param name the name of the System
     */
    constructor(public readonly name: string) { }

    /**
     * Abstract update method, called once per frame while the System is active; to be type-narowed by the 2D and 3D abstract variants for
     *   parameter type safety
     *
     * @param game the 2D or 3D Game the System is operating within
     * @param frameDelta the frame delta as calculated by the Game
     */
    public abstract tick(game: Game, frameDelta: number): void;
}
