import { UniformList } from './uniformList.type';

/**
 * Utility type representing a concrete set of shader uniform values for a given list of Entities, constructed by the EntityManager on
 *   render() and used by the WebGLRenderer to split draw calls appropriately
 *
 * One UniformSet represents multiple sets of values to pipe to the GPU, mapping conceptually to multiple draw calls
 *
 * @see UniformList
 * @see EntityManager
 * @see WebGLRenderer
 */
export type UniformSet = Array<UniformList>;
