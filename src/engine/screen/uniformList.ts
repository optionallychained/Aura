// TODO should this be in a .d.ts file?

import { UniformType } from '../shader/uniformType';

// // ...for that matter, should all interfaces + types?
export type UniformList = Array<{
    name: string;
    type: UniformType;
    value: Float32Array | number;
}>;

export type UniformSet = Array<UniformList>;
