import { Component } from './component';

export class Texture extends Component {

    constructor(
        public readonly column: number,
        public readonly row: number,
        public readonly columnSpan = 1,
        public readonly rowSpan = 1
    ) {

        super('Texture');
    }
}
