import { UniformType } from './uniformType.enum';
import { UniformVariation } from './uniformVariation.enum';

/**
 * Utility type representing an array of shader uniform specifications, used in defining VertexShaders and FragmentShaders and aiding the
 *   system's automatic retrieval/upload of uniform data at render time
 *
 * Uniform 'variation' is a special field which determines both how often a uniform will vary, and how it can be retrieved by the Renderer
 *
 * @see UniformType
 * @see UniformVariation
 */
export type UniformArray = Array<{ readonly name: string; readonly type: UniformType; readonly variation: UniformVariation }>;
