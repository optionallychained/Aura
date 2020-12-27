import { ProtoGL } from '@protogl/protogl';

export abstract class System {

    constructor(protected game: ProtoGL) { }

    public abstract tick(frameDelta: number): void;
}
