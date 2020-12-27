import { ProtoGL } from '@protogl/protogl';

export abstract class System {

    public abstract name: string;

    constructor(protected game: ProtoGL) { }

    public abstract tick(frameDelta: number): void;
}
