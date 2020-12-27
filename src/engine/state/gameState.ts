import { ProtoGL } from '@protogl/protogl';

interface GameStateConfig {
    name: string;
    initFunc: (game: ProtoGL) => void;
    // TODO param not enforced for implementers, maybe indication this isn't the right approach?
    tickFunc: (game: ProtoGL, frameDelta: number) => void;
}

export class GameState {

    constructor(private config: GameStateConfig) { }

    public init(game: ProtoGL): void {
        this.config.initFunc(game);
    }

    // TODO sensible way for both initFunc and tickFunc to refer to 'this' from the outside without esoteric bullshit
    public tick(game: ProtoGL, frameDelta: number): void {
        this.config.tickFunc(game, frameDelta);
    }

    public getName(): string {
        return this.config.name;
    }
}
