import { Game } from '../core';
import { RenderingMode } from '../screen/renderingMode.type';

/**
 * Interface describing a State Configuration object
 */
export interface StateConfig {
    /** A name for the State; none is provided by default */
    name: string;
    /** The rendering mode of the State, enabling Games to mix 2D and 3D States; '2D' or '3D'; none is provided by default */
    renderingMode: RenderingMode;
    /** State initialisation function; optional */
    init?: (game: Game) => void;
    /** State end/shutdown function; optional */
    end?: (game: Game) => void;
    /** State frame tick function; none is provided by default */
    tick: (game: Game, frameDelta: number) => void;
}
