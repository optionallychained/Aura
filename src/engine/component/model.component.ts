import { Geometry, GLShape } from '../geometry';
import { Vec2 } from '../math';
import { Component } from './component';

export class Model extends Component implements Geometry {

    public modelName: string;
    public vertices: Array<Vec2>;
    public glShape: GLShape;
    public vertexSize: number;
    public vertexCount: number;

    constructor(geometry: Geometry) {
        super('Model');

        this.vertices = geometry.vertices;
        this.glShape = geometry.glShape;
        this.vertexSize = geometry.vertexSize;
        this.vertexCount = geometry.vertexCount;
        this.modelName = geometry.name;
    }
}
