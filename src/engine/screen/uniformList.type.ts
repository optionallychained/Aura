import { UniformType } from '../shader';

/**
 * Utility type representing the concrete set of shader uniform values for a given Entity, constructed by the EntityManager on render() and
 *   used by the WebGLRenderer to split draw calls appropriately
 *
 * One UniformList represents one set of values to pipe to the GPU, mapping conceptually to a single draw call
 *
 * @see UniformSet
 * @see EntityManager
 * @see WebGLRenderer
 */
export type UniformList = Array<{
    /** The name of a uniform variable */
    name: string;
    /**  The type of the uniform variable */
    type: UniformType;
    /**  The value to pipe to the GPU for this uniform */
    value: Float32Array | number;
}>;
