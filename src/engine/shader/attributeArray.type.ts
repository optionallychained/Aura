/**
 * Utility type representing an array of shader attribute specifications, denoting their names and sizes, used in handling shader
 *   compilation and automatic shader value resolution for rendering
 */
export type AttributeArray = Array<{ name: string; size: number; }>;
