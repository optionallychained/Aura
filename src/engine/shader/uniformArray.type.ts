import { UniformType } from './uniformType.enum';
import { ShaderVariableVariation } from './shaderVariableVariation.enum';

/**
 * Utility type representing an array of shader uniform specifications, used in defining VertexShaders and FragmentShaders and aiding the
 *   system's automatic retrieval/upload of uniform data at render time
 *
 * Uniform 'variation' is a special field which directs the WebGLRenderer on how and how often to retrieve and upload the specified uniform
 *
 * @see UniformType
 * @see ShaderVariableVariation
 */
export type UniformArray = Array<{ readonly name: string; readonly type: UniformType; readonly variation: ShaderVariableVariation }>;
