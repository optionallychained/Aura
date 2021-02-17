import { UniformType } from './uniformType';

export interface VertexShader {
    name: string;

    source: string;

    attributes: Array<{
        name: string;
        size: number;
    }>;

    uniforms: Array<{
        name: string;
        type: UniformType;
    }>;
}
