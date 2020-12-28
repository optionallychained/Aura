export abstract class Component {

    constructor(protected name: string) { }

    public getName(): string {
        return this.name;
    }
}
