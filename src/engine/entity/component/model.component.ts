import { Geometry } from '../../geometry/geometry';
import { GLShape } from '../../geometry/glShape';
import { Vec2 } from '../../math/vec2';
import { Component } from './component';

export class Model extends Component implements Geometry {

    public vertices: Array<Vec2>;
    public glShape: GLShape;

    constructor(geometry: Geometry) {
        super('Model');

        this.vertices = geometry.vertices;
        this.glShape = geometry.glShape
    }
}
