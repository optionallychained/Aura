import { Vec2 } from '../math';
import { GeometryConfig } from './geometry.config';
import { GLShape } from './glShape.enum';

/**
 * Abstract class representing geometry, generically defining a shape to be renderered
 *
 * Stores and provides access to all the information the system needs to render an Entity with a given shape
 *
 * Used to associate Entities with vertex sets to facilitate rendering in Model Components
 *
 * @see Model
 */
export abstract class Geometry {

    /**
     * Constructor. Take and store the Geometry's configuration object
     *
     * @param config the Geometry's configuration object
     */
    constructor(private readonly config: GeometryConfig) { }

    /**
     * Getter for the Geometry's name, as provided in its config
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Getter for the Geometry's vertices, as provided in its config
     */
    public get vertices(): Float32Array {
        return this.config.vertices;
    }

    /**
     * Getter for the Geometry's vertexSize, as provided in its config
     */
    public get vertexSize(): number {
        return this.config.vertexSize;
    }

    /**
     * Getter for the Geometry's vertexCount, as provided in its config
     */
    public get vertexCount(): number {
        return this.config.vertexCount;
    }

    /**
     * Getter for the Geometry's GLShape, as provided in its config
     */
    public get glShape(): GLShape {
        return this.config.glShape;
    }
}
