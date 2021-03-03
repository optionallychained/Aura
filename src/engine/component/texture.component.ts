import { Component } from './component';

export class Texture extends Component {

    constructor(
        // TODO textureName currently unused...maybe want to pass in the atlas itself here?
        public readonly textureName: 'world' | 'text' | 'ui',
        public readonly column: number,
        public readonly row: number
    ) {

        super('Texture');
    }
}
