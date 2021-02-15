import { ShaderProgram } from '../shader';
import { Component } from './component';

export class Shader extends Component {
    constructor(public program: ShaderProgram) {
        super('Shader');
    }
}
