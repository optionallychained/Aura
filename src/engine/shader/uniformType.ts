export enum UniformType {
    VEC2 = 'vec2',
    VEC3 = 'vec3',
    VEC4 = 'vec4',
    MAT3 = 'mat3',
    MAT4 = 'mat4',
    NUMBER = 'number'
}

export type UniformArray = Array<{ name: string; type: UniformType; }>;

export type AttributeArray = Array<{ name: string; size: number; }>;
