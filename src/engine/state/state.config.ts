import { Game, Game2D, Game3D, GameConfig2D, GameConfig3D } from '../core';

interface StateConfig {
    readonly name: string;
}

export interface StateConfig2D extends StateConfig {
    readonly tick: (game: Game2D, frameDetla: number) => void;
    readonly init?: (game: Game2D) => void;
    readonly end?: (game: Game2D) => void;
}

export interface StateConfig3D extends StateConfig {
    readonly tick: (game: Game3D, frameDelta: number) => void;
    readonly init?: (game: Game3D) => void;
    readonly end?: (game: Game3D) => void;
}
