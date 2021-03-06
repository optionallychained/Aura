import { Game } from '../core';
import { RenderingMode } from '../renderer';

/**
 * Interface describing a State Configuration object
 */
export interface StateConfig {
    /** A name for the State; none is provided by default */
    readonly name: string;
    /** The rendering mode of the State, enabling Games to mix 2D and 3D States; '2D' or '3D'; none is provided by default */
    readonly renderingMode: RenderingMode;
    /** State frame tick function */
    readonly tick: (game: Game, frameDelta: number) => void;
    /** State initialisation function; optional */
    readonly init?: (game: Game) => void;
    /** State end/shutdown function; optional */
    readonly end?: (game: Game) => void;
}
