import { UniformType } from '../shader/uniformType';

export type UniformList = Array<{
    name: string;
    type: UniformType;
    value: Float32Array | number;
}>;
