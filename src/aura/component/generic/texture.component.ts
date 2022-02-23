import { Component } from '../component';

/**
 * Texture component, defining the grid positions within a TextureAtlas that an Entity will sample from
 *
 * Entities sample from the TextureAtlas associated with the EntityManager they belong to (world, text, ui)
 *
 * Entities can sample from multiple cells in the Atlas' grid with the columnSpan and rowSpan fields
 */
export class Texture extends Component {

    /**
     * Constructor. Take the texture sampling information and provide the name 'Texture' to the parent class
     *
     * @param column the x-position of the texture within the atlas grid; left = 0 -> n = right
     * @param row the y-position of the texture within the atlas grid; bottom = 0 -> n = top
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
