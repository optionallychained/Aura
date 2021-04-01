import { Game3D } from '../core';
import { State } from './state';
import { StateConfig2D, StateConfig3D } from './state.config';

export class State3D extends State<StateConfig3D> {

    public init(game: Game3D): void {
        this.config.init?.(game);
    }

    public tick(game: Game3D, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    public end(game: Game3D): void {
        this.config.end?.(game);
    }
}
