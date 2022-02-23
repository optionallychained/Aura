import { Geometry } from '../../geometry/geometry';
import { GLShape } from '../../geometry/glShape.enum';
import { Component } from '../component';

/**
 * Model Component, defining the Geometry the Entity will use to define its shape
 *
 * Together with the Shader Component, makes an Entity renderable
 */
export class Model extends Component {

    /**
     * Constructor. Take the Geometry to use and provide the name 'Model' to the parent class
     *
     * @param geometry the Geometry to use
     */
    constructor(private readonly geometry: Geometry) {
        super('Model');
    }

    /**
     * Retrieve the Geometry's name
     */
    public get modelName(): string {
        return this.geometry.name;
    }

    /**
     * Retrieve the Geometry's vertices
     */
    public get vertices(): Float32Array {
        return this.geometry.vertices;
    }

    /**
     * Retrieve the Geometry's vertex size
     */
    public get vertexSize(): number {
        return this.geometry.vertexSize;
    }

    /**
     * Retrieve the Geometry's vertex count
     */
    public get vertexCount(): number {
        return this.geometry.vertexCount;
    }

    /**
     * Retrieve the Geometry's GLShape
     */
    public get glShape(): GLShape {
        return this.geometry.glShape;
    }

    /**
     * Retrieve the Geometry's texture coordinates
     */
    public get textureCoordinates(): Float32Array {
        return this.geometry.textureCoordinates;
    }
}
