import { Game } from '../core/game';

export abstract class System {

    public abstract name: string;

    constructor(protected game: Game) { }

    public abstract tick(frameDelta: number): void;
}
