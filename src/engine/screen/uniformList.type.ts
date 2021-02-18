import { UniformType } from '../shader';

export type UniformList = Array<{
    name: string;
    type: UniformType;
    value: Float32Array | number;
}>;
