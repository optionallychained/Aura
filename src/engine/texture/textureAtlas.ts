export class TextureAtlas {

    constructor(
        public readonly name: 'world' | 'text' | 'ui',
        public readonly src: string,
        public readonly columns: number,
        public readonly rows: number
    ) { }

    public resolveTextureCoordinates(coords: Float32Array, column: number, row: number, columnSpan: number, rowSpan: number): Float32Array {
        return Float32Array.from([
            (column + coords[0]) / (this.columns - columnSpan + 1),
            1 - ((row + coords[1]) / (this.rows - rowSpan + 1))
        ]);
    }
}
