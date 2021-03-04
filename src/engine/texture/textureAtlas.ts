import { Texture } from '../component';

export class TextureAtlas {

    private textureIdentifier: WebGLTexture = -1;

    constructor(
        public readonly name: 'world' | 'text' | 'ui',
        public readonly src: string,
        public readonly columns: number,
        public readonly rows: number
    ) { }

    public resolveTextureCoordinates(coords: Float32Array, column: number, row: number): Float32Array {
        return Float32Array.from([
            (column / this.columns) + (coords[0] / this.columns),
            1 - ((row / this.rows) + (coords[1] / this.rows))
        ]);
    }

    public setTextureIdentifier(identifier: WebGLTexture): void {
        this.textureIdentifier = identifier;
    }
}
