import { Game } from '../core';

/**
 * Interface describing a State Configuration object
 */
export interface StateConfig {
    /** A name for the State; none is provided by default */
    name: string;
    /** The rendering mode of the State; 2D or 3D; none is provided by default */
    renderMode: '2D' | '3D';
    /** State initialisation function; optional */
    init?: (game: Game) => void;
    /** State end/shutdown function; optional */
    end?: (game: Game) => void;
    /** State frame tick function; none is provided by default */
    tick: (game: Game, frameDelta: number) => void;
}
