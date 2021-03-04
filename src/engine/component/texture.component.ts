import { Component } from './component';

export class Texture extends Component {

    constructor(
        public readonly column: number,
        public readonly row: number
    ) {

        super('Texture');
    }
}
