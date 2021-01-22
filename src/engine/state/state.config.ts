import { Game } from '../core/game';

export interface StateConfig {
    name: string;
    init: (game: Game) => void;
    end?: (game: Game) => void;
    tick: (game: Game, frameDelta: number) => void;
}
