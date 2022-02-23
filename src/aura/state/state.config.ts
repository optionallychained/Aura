import { Game as Game2D } from '../core/2d/game';
import { Game as Game3D } from '../core/3d/game';

/**
 * Interface describing a State Configuration object
 *
 * @typeparam Game the specific 2D or 3D Game type the State will operate within
 */
export interface StateConfig<Game extends Game2D | Game3D> {
    /** A name for the State */
    readonly name: string;
    /** tick lifecycle method for the State; called once per frame as an update routine */
    readonly tick: (game: Game, frameDelta: number) => void;
    /** optional init lifecycle method for the State; called when the State is switched to */
    readonly init?: (game: Game) => void;
    /** optional end lifecycle method for the State; called when the State is switched away from */
    readonly end?: (game: Game) => void;
}
