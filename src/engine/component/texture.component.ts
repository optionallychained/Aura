import { Vec2, Vec4 } from '../math';
import { Component } from './component';

export class Texture extends Component {

    private currentCoord = 0;

    constructor(public readonly textureName: string, public readonly texCoords: Array<Vec2>) {
        super('Texture');
    }

    public nextCoord(): Vec2 {
        const coord = this.texCoords[this.currentCoord++];

        if (this.currentCoord === this.texCoords.length) {
            this.currentCoord = 0;
        }

        return coord;
    }
}
