interface GameStateConfig {
    name: string;
    initFunc: () => void;
    // TODO param not enforced for implementers, maybe indication this isn't the right approach?
    tickFunc: (frameDelta: number) => void;
}

export class GameState {

    constructor(private config: GameStateConfig) { }

    public init(): void {
        this.config.initFunc();
    }

    // TODO sensible way for both initFunc and tickFunc to refer to 'this' from the outside without esoteric bullshit
    public tick(frameDelta: number): void {
        this.config.tickFunc(frameDelta);
    }

    public getName(): string {
        return this.config.name;
    }
}
