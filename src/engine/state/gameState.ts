import { Game } from '../core/game';

interface GameStateConfig {
    name: string;
    initFunc: (game: Game) => void;
    endFunc?: (game: Game) => void;
    // TODO param not enforced for implementers, maybe indication this isn't the right approach?
    tickFunc: (game: Game, frameDelta: number) => void;
}

export class GameState {

    constructor(private config: GameStateConfig) { }

    public init(game: Game): void {
        this.config.initFunc(game);
    }

    // TODO sensible way for both initFunc and tickFunc to refer to 'this' from the outside without esoteric bullshit
    public tick(game: Game, frameDelta: number): void {
        this.config.tickFunc(game, frameDelta);
    }

    public end(game: Game): void {
        if (this.config.endFunc) {
            this.config.endFunc(game);
        }
    }

    public getName(): string {
        return this.config.name;
    }
}
