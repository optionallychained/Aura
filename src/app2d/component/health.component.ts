import { Component } from '../../engine';

export class Health extends Component.Component {

    constructor(public health: number) {
        super('Health');
    }
}
