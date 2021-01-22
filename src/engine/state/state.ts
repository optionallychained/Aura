import { Game } from '../core/game';
import { StateConfig } from './state.config';

export class State {

    constructor(private config: StateConfig) { }

    public init(game: Game): void {
        this.config.init(game);
    }

    public tick(game: Game, frameDelta: number): void {
        this.config.tick(game, frameDelta);
    }

    public end(game: Game): void {
        this.config.end?.(game);
    }

    public getName(): string {
        return this.config.name;
    }
}
