import { Game2D } from '../core/2d/game.2d';
import { Game3D } from '../core/3d/game.3d';

/**
 * Interface describing a State Configuration object, providing a name as well as its lifecycle methods
 *
 * The typeparam specifies which concrete Game type the State belongs to, allowing for the concrete State2D and State3D to receive a
 *   type-correct Game instance in their lifecycle methods, and enabling the assurance that a Game is only configured with the corresponding
 *   2D or 3D State type
 *
 * @typeparam TGame the concrete Game Type the State belongs to
 */
export interface StateConfig<TGame extends Game2D | Game3D> {
    /** A name for the State */
    readonly name: string;
    /** tick lifecycle method for the State; called once per frame as an update routine */
    readonly tick: (game: TGame, frameDelta: number) => void;
    /** optional init lifecycle method for the State; called when the State is switched to */
    readonly init?: (game: TGame) => void;
    /** optional end lifecycle method for the State; called when the State is switched away from */
    readonly end?: (game: TGame) => void;
}
