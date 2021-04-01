import { Game2D } from '../core';
import { State } from './state';
import { StateConfig2D } from './state.config';

export class State2D extends State<StateConfig2D> {

    public init(game: Game2D): void {
        this.config.init?.(game);
    }

    public tick(game: Game2D, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    public end(game: Game2D): void {
        this.config.end?.(game);
    }
}
