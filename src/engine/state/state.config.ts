import { Game2D, Game3D } from '../core';

export interface StateConfig<TGame extends Game2D | Game3D> {
    readonly name: string;
    readonly tick: (game: TGame, frameDelta: number) => void;
    readonly init?: (game: TGame) => void;
    readonly end?: (game: TGame) => void;
}
