import { GeometryConfig } from './geometry.config';
import { GLShape } from './glShape.enum';

/**
 * Class representing geometry, generically defining a shape to be renderered
 *
 * Stores and provides access to all the information the system needs to render an Entity with a given shape
 *
 * Used to associate Entities with vertex sets and GL drawing modes to facilitate rendering in Model Components
 *
 * Also defines Texture Coordinates so as to standardise the texture sampling method on a per-shape basis, working in conjunction with
 *   TextureAtlas and Texture Components to create the system's support for textures
 *
 * @see Model
 */
export class Geometry {

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

    /**
     * Getter for the Geometry's textureCoordinates, as provided in its config
     */
    public get textureCoordinates(): Float32Array {
        return this.config.textureCoordinates;
    }
}
