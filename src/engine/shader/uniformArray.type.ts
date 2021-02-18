import { UniformType } from './uniformType.enum';

/**
 * Utility type representing an array of shader uniform specifications, denoting their names and types, used in handling shader
 *   compilation and automatic shader value resolution for rendering
 */
export type UniformArray = Array<{ name: string; type: UniformType; }>;
