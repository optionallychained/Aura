import { UniformType } from './uniformType.enum';
import { UniformVariation } from './uniformVariation.enum';

/**
 * Utility type representing an array of shader uniform specifications, used in defining VertexShaders and FragmentShaders
 *
 * Uniform 'variation' is a special field which determines both how often a uniform will vary, and how it can be retrieved by the Renderer
 */
export type UniformArray = Array<{ readonly name: string; readonly type: UniformType; readonly variation: UniformVariation }>;
