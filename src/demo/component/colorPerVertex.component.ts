import { Color, Component, } from '../../engine';

/**
 * Custom Component, holding multiple Colors for an Entity and
 *   providing Color cycling functionality for per-vertex variation
 */
export class ColorPerVertex extends Component.Component {

    private currentColor = 0;

    constructor(public colors: Array<Color>) {
        super('ColorPerVertex');
    }

    /**
     * Retrieve the next Color in the list, clamping the counter if necessary
     */
    public nextColor(): Color {
        const color = this.colors[this.currentColor++];

        if (this.currentColor === this.colors.length) {
            this.currentColor = 0;
        }

        return color;
    }
}
