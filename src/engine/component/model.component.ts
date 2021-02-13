import { Geometry, GLShape } from '../geometry';
import { Vec2 } from '../math';
import { Component } from './component';

export class Model extends Component implements Geometry {

    public vertices: Array<Vec2>;
    public glShape: GLShape;
    public vertSize: number;
    public vertCount: number;

    constructor(geometry: Geometry) {
        super('Model');

        this.vertices = geometry.vertices;
        this.glShape = geometry.glShape;
        this.vertSize = geometry.vertSize;
        this.vertCount = geometry.vertCount;
    }
}
