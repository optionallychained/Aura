import { Game2D } from '../core/2d/game.2d';
import { Game3D } from '../core/3d/game.3d';

/**
 * Abstract class representing a System, broken down into concrete 2D and 3D variants in System2D and System3D
 *
 * A System is at its core a distinct and purposeful processing method that runs once per frame, intended for the production of Game
 *   behavior by way of operating on given sets of Entities
 *
 * Example Systems may include Physics and Collision
 *
 * The typeparam specifies which concrete Game type the System belongs to, allowing for concrete System2Ds and System3Ds to receive a
 *   type-correct Game instance in their tick lifecycle method, and enabling the assurance that a Game is only configured with the
 *   corresponding 2D or 3D System type
 *
 * @typeparam TGame the concrete Game type the State belongs to
 */
export abstract class System<TGame extends Game2D | Game3D> {

    /** Abstract name for the System, to be implemented by concrete Systems */
    public abstract readonly name: string;

    /**
     * Abstract tick lifecycle method, called once per frame while the System is active
     *
     * Receives the type-correct Game instance as well as the frameDelta so as to provide full flexibility on the System's behavior
     *
     * @param game the Game2D or Game3D the System is running within
     * @param frameDelta the Game's frameDelta for normalizing time-dependent operations
     */
    public abstract tick(game: TGame, frameDelta: number): void;
}
