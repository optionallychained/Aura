import { GLShape } from '../geometry';
import { UniformType } from '../shader/uniformType';

export interface WebGLRendererConfig {
    // TODO turn into type; duplicate definition in EntityManager
    vbo: {
        name: string;
        vertices: Float32Array,
        changed: boolean,
        glShape: GLShape,
        vertexCount: number,
        vertexSize: number
    }

    shaderProgramName: string;

    // TODO turn into type; duplicate definition in EntityManager
    uniforms: Array<{
        [key: string]: {
            type: UniformType, // TODO
            value: Float32Array
        }
    }>;
}
