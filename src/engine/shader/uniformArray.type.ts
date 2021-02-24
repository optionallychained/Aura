import { UniformType } from './uniformType.enum';

/**
 * Utility type representing an array of shader uniform specifications, denoting their names and types, used in defining VertexShaders and
 *   FragmentShaders and handling shader compilation + Entity value resolution in rendering
 */
export type UniformArray = Array<{ readonly name: string; readonly type: UniformType; }>;
