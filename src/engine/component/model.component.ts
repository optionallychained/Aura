import { ProtoGLError } from '../core';
import { Geometry, GLShape } from '../geometry';
import { Component } from './component';

/**
 * Built-in Model Component, defining the Geometry the Entity will use to define its shape
 *
 * @see Geometry
 */
export class Model extends Component {

    /**
     * Constructor. Take and store the Geometry to use
     *
     * @param geometry the Geometry to use
     */
    constructor(private readonly geometry: Geometry) {
        super('Model');
    }

    /**
     * Getter for the Model's name, as provided in its Geometry config
     */
    public get modelName(): string {
        return this.geometry.name;
    }

    /**
     * Getter for the Model's vertices, as provided in its Geometry config
     */
    public get vertices(): Float32Array {
        return this.geometry.vertices;
    }

    /**
     * Getter for the Model's vertexSize, as provided in its Geometry config
     */
    public get vertexSize(): number {
        return this.geometry.vertexSize;
    }

    /**
     * Getter for the Model's vertexCount, as provided in its Geometry config
     */
    public get vertexCount(): number {
        return this.geometry.vertexCount;
    }

    /**
     * Getter for the Model's GLShape, as provided in its Geometry config
     */
    public get glShape(): GLShape {
        return this.geometry.glShape;
    }

    public get textureCoordinates(): Float32Array {
        const { textureCoordinates } = this.geometry;

        // TODO hmmm
        // should textureCoordinates just be a required prop of Geometry?
        if (!textureCoordinates) {
            throw new ProtoGLError({
                class: 'Model',
                method: 'textureCoordinates',
                message: `Failed to retrieve Texture Coordinates for model ${this.modelName}`
            })
        }

        return textureCoordinates;
    }
}
