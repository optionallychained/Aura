/**
 * Class representing a texture atlas; a uniformly-distributed grid composed of individual textures which Entities may sample from with
 *   Texture Components
 *
 * One part of the system's solution for texture support
 *
 * Utilised by EntityManagers in configuring the WebGLRenderer and resolving texture coordinates for Entity vertex lists, three
 *   TextureAtlases are supported to contain textures for game objects (World), text (Font) and UI elements (UI)
 *
 * Atlases, if required, are configured in association with World, UI and Font by way of the top-level GameConfig object
 *
 * Image dimensions must be power-of-2 in both x and y
 *
 * // TODO Texture implementation is likely to change significantly in the future; all this is subject to change. Especially, a stronger
 * //   association between Entities and their Atlases (rather than indirectly via built-ins and Managers) is desirable
 *
 * @see Texture
 * @see GameConfig
 * @see WorldConfig
 * @see UIConfig
 * @see FontConfig
 * @see EntityManagerConfig
 */
export class TextureAtlas {

    /**
     * Constructor. Take the Atlas' name and filepath, as well as the dimensions of the atlas
     *
     * Atlases must (currently?) be uniform, in that the Atlas should be divisible evenly along its x and y axis to yield individual
     *   textures. However, an Entity can specify a column/row "span" so as to sample from multiple contiguous columns or rows in the Atlas,
     *   allowing for packing of differently-sized textures
     *
     * @param name the name of the Atlas, constrained to the three supported names
     * @param src the file path of the image the Atlas will load
     * @param columns the number of texture cells on the x-axis of the Atlas
     * @param rows the number of texture cells on the y-axis of the Atlas
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
     * Given a set of vertex texture coordinates retrieved from an Entity's Model, as well as the atlas positional data found in the
     *   Entity's Texture, calculate the real texCoord value to build into the Entity's vertex list
     *
     * Implements half pixel correction to avoid texture bleeding
     *
     * Texture coordinates are specified on a Model with values ranging 0->1, as if sampling from a whole image. Using this in conjunction
     *   with a Texture Component's positional data, we can treat those values as being "within a designated sample space", simplifying the
     *   specification of texture coordinates for Models as well as removing the need for Entities to explicitly define texture coordinates
     *
     * @param coords the base texture coordinates to scale
     * @param column the column within the Atlas to sample from
     * @param row the row within the Atlas to sample from
     * @param columnSpan the number of columns to span in the sample
     * @param rowSpan the number of rows to span in the sample
     *
     * @returns the corrected texture coordinates, sampling from (column -> column + columnSpan), (row -> row + rowSpan)
     */
    public resolveTextureCoordinates(coords: Float32Array, column: number, row: number, columnSpan: number, rowSpan: number): Float32Array {
        const u = (column + coords[0]) / (this.columns - columnSpan + 1);
        const v = 1 - ((row + coords[1]) / (this.rows - rowSpan + 1));

        // TODO this seems kinda messy...but it does work
        // "issue" seems to be caused by want to generalise the solution here for both left-most and right-most coordinates, rather than in
        //   texture coordinate specification in Geometry
        // review at a later time...this nonsense may be "worth it"
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
