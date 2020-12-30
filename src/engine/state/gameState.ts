import { Game } from '../core/game';

interface GameStateConfig {
    name: string;
    init: (game: Game) => void;
    end?: (game: Game) => void;
    // TODO param not enforced for implementers, maybe indication this isn't the right approach?
    tick: (game: Game, frameDelta: number) => void;
}

export class GameState {

    constructor(private config: GameStateConfig) { }

    public init(game: Game): void {
        this.config.init(game);
    }

    // TODO sensible way for both initFunc and tickFunc to refer to 'this' from the outside without esoteric bullshit
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
