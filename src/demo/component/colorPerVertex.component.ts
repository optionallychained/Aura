import { Color, Component, } from '../../engine';

export class ColorPerVertex extends Component.Component {

    public currentColor = 0;

    constructor(public colors: Array<Color>) {
        super('ColorPerVertex');
    }

    public nextColor(): Color {
        const color = this.colors[this.currentColor];

        if (!color) {
            console.log('NO COLOR');
        }

        this.currentColor++;

        if (this.currentColor === this.colors.length) {
            this.currentColor = 0;
        }

        return color;
    }
}
