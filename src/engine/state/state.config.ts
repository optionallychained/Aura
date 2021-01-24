import { Game } from '../core/game';

/**
 * Interface describing a State Configuration object
 */
export interface StateConfig {
    /** A name for the State; none is provided by default */
    name: string;
    /** State initialisation function; none is provided by default */
    init: (game: Game) => void;
    /** State end/shutdown function; optional */
    end?: (game: Game) => void;
    /** State frame tick function; none is provided by default */
    tick: (game: Game, frameDelta: number) => void;
}
