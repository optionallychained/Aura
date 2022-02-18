import { GeometryConfig } from './geometry.config';
import { GLShape } from './glShape.enum';

/**
 * Geometry representation; generically defining a shape to be rendered
 *
 * Provides access to vertex data and texture coordinates required to render a given shape
 *
 * Attached to Entities by way of Model Components for rendering
 */
export class Geometry {

    /**
     * Constructor. Take a GeometryConfig
     *
     * @param config the GeometryConfig
     */
    constructor(private readonly config: GeometryConfig) { }

    /**
     * Retrieve the Geometry's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Retrieve the Geometry's vertices
     */
    public get vertices(): Float32Array {
        return this.config.vertices;
    }

    /**
     * Retrieve the Geometry's vertex size
     */
    public get vertexSize(): number {
        return this.config.vertexSize;
    }

    /**
     * Retrieve the Geometry's vertex count
     */
    public get vertexCount(): number {
        return this.config.vertexCount;
    }

    /**
     * Retrieve the Geometry's GLShape
     */
    public get glShape(): GLShape {
        return this.config.glShape;
    }

    /**
     * Retrieve the Geometry's texture coordinates
     */
    public get textureCoordinates(): Float32Array {
        return this.config.textureCoordinates;
    }
}
