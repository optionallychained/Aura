import { Game } from '../core/game';

export abstract class System {

    constructor(protected name: string) { }

    public abstract tick(game: Game, frameDelta: number): void;

    public getName(): string {
        return this.name;
    }
}
