import { Vec4 } from '../math';
import { Component } from './component';

export class Texture extends Component {

    constructor(public readonly textureName: string, public readonly texCoords: Vec4) {
        super('Texture');
    }
}
