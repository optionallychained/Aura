import { Geometry, GLShape } from '../geometry';
import { Vec2 } from '../math';
import { Component } from './component';

/**
 * Built-in Model Component, defining the Geometry the Entity will use to define its shape
 *
 * @see Geometry
 */
export class Model extends Component implements Geometry {

    /** The name of the Model */
    public modelName: string;

    /** The vertices that make up the Model */
    public vertices: Array<Vec2>;

    /** The GLShape of the Model */
    public glShape: GLShape;

    /** The size of each of the Model's vertices */
    public vertexSize: number;

    /** The number of vertices the Model is made up of */
    public vertexCount: number;

    /**
     * Constructor. Take the Geometry to use, and extract its details into the Component
     *
     * @param geometry the Geometry to use
     */
    constructor(geometry: Geometry) {
        super('Model');

        this.modelName = geometry.name;
        this.vertices = geometry.vertices;
        this.glShape = geometry.glShape;
        this.vertexSize = geometry.vertexSize;
        this.vertexCount = geometry.vertexCount;
    }
}
