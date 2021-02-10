import { Component } from './component';

export class Shader extends Component {
    constructor(public programName: string) {
        super('Shader');
    }
}
