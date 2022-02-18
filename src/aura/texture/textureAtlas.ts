/**
 * Texture Atlas representation; a uniform grid composed of individual textures which Entities may sample from with Texture Components
 *
 * One TextureAtlas may be configured for each EntityManager (World, UI, Text), providing texture sampling space for each Entity type
 *
 * Images used in TextureAtlas configurations must have power-of-2 dimensions
 *
 * NB: the Game (currently) configures a default TextureAtlas for Font, expecting a monospace Font texture at `./src/res/font.png`
 */
export class TextureAtlas {

    /**
     * Constructor. Take the Atlas' name and image filepath, the image's dimensions, and the number of rows and columns in the image's grid
     *
     * @param name the name of the Atlas, constrained to the three supported use cases
     * @param src the file path of the Atlas' image
     * @param width the pixel width of the Atlas' image
     * @param height the pixel height of the Atlas' image
     * @param columns the number of texture cells along the Atlas' x dimension
     * @param rows the number of texture cells along the Atlas' y dimension
     */
    constructor(
        public readonly name: 'world' | 'text' | 'ui',
        public readonly src: string,
        public readonly width: number,
        public readonly height: number,
        public readonly columns: number,
        public readonly rows: number
    ) { }

    /**
     * Given a set of normalized vertex texture coordinates retrieved from an Entity's Model Component (specified by Geometry), as well as
     *   the Atlas row and column to sample from retrieved from an Entity's Texture Component, calculate the real Texture Coordinate value
     *   to pack into the Entity's vertex array
     *
     * Implements half pixel correction to avoid texture bleeding
     *
     * @param coords the normalized texture coordinates as associated with a given vertex (Geometry texCoords)
     * @param column the Atlas column to sample from
     * @param row the Atlas row to sample from
     * @param columnSpan the number of columns to sample from within the Atlas (Texture columnSpan)
     * @param rowSpan the number of rows to sample from within the atlas (Texture rowSpan)
     *
     * @returns the calculated and corrected texture coordinates for the vertex
     */
    public resolveTextureCoordinates(coords: Float32Array, column: number, row: number, columnSpan: number, rowSpan: number): Float32Array {
        const u = (column + coords[0]) * (columnSpan / this.columns) - (((columnSpan - 1) / this.columns) * column);
        const v = 1 - ((row + coords[1]) * (rowSpan / this.rows) - (((rowSpan - 1) / this.rows) * row));

        // TODO this is horrible, but it works for now
        // issue caused by want to generalise solution for both left-and-right-most coordinates here rather than in geometry texcoords
        let uCorrected = (((u * this.width) + 0.5) - 1) / this.width;
        if (uCorrected < 0) {
            uCorrected = ((u * this.width) + 0.5) / this.width;
        }

        let vCorrected = (((v * this.height) + 0.5) - 1) / this.height;
        if (vCorrected < 0) {
            vCorrected = ((v * this.height) + 0.5) / this.height;
        }

        return Float32Array.from([uCorrected, vCorrected]);
    }
}
