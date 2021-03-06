import { Component } from './component';

/**
 * Built-in Texture component, defining the position within a texture atlas an Entity will sample from
 *
 * Alongside TextureAtlas, creates the system's support for uniform texture atlases of nxn dimensions
 *
 * Entities sample from one of three supported texture atlases (world, text, ui), where which they will sample from is determined by the
 *   EntityManager they are handled by (World, Font, UI)
 *
 * // TODO Texture implementation is likely to change significantly in the future; all this is subject to change. Especially, a stronger
 * //   association between Entities and their Atlases (rather than indirectly via built-ins and Managers) is desirable
 *
 * @see TextureAtlas
 */
export class Texture extends Component {

    /**
     * Constructor. Take the texture sample's column and row, and optionally the number of atlas cells to span
     *
     * Columns and rows are indexed from the bottom-left of the atlas and start at 0, with 0x0 being the bottom-left texture cell and
     *   nxn being the top-right cell
     *
     * Spans allow for an atlas to be made up of individual textures of varying sizes; for example in an atlas of size 3x3, an Entity could
     *   sample from the entire right-most column by specifying:
     *     - column = 2
     *     - columnSpan = 1
     *     - row = 0
     *     - rowSpan = 3
     *
     * @param column the x-position of the texture within the atlas; left = 0 -> n = right
     * @param row the y-position of the texture within the atlas; bottom = 0 -> n = top
     * @param columnSpan the number of cells to sample from on the x-axis of the atlas; counting right
     * @param rowSpan the number of cells to sample from on the y-axis of the atlas; counting up
     */
    constructor(
        public readonly column: number,
        public readonly row: number,
        public readonly columnSpan = 1,
        public readonly rowSpan = 1
    ) {

        super('Texture');
    }
}
