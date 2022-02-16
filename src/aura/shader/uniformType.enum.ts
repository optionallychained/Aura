/**
 * Enum mapping convenient uniform type names to a string representation, used to lock down Shader uniform definitions and facilitate
 *   automatic uniform GPU uploads in the WebGLRenderer
 */
export enum UniformType {
    VEC2 = 'vec2',
    VEC3 = 'vec3',
    VEC4 = 'vec4',
    MAT3 = 'mat3',
    MAT4 = 'mat4',
    INTEGER = 'integer',
    FLOAT = 'float',
}
