/**
 * Utility type representing an array of shader attribute specifications, denoting their names and sizes, used in defining VertexShaders
 *   and handling shader compilation + Entity value resolution in rendering
 */
export type AttributeArray = Array<{ readonly name: string; readonly size: number; }>;
