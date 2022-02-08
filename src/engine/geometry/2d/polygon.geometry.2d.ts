import { Geometry } from '../geometry';
import { GLShape } from '../glShape.enum';

/**
 * Built-in generic 2D Polygon Geometry factory, enabling the runtime production of n-sided shapes
 */
export const POLYGON = (vertexCount: number, name?: string): Geometry => {
    const vertexSize = 2;
    const vertices: Array<number> = [];

    for (let i = 0; i < vertexCount * vertexSize; i += vertexSize) {
        const angle = (Math.PI * i) / vertexCount;

        vertices.push(Math.cos(angle) / 2);
        vertices.push(Math.sin(angle) / 2);
    }

    return new Geometry({
        name: name ?? `polygon_${vertexCount}`,
        vertices: Float32Array.from(vertices),
        vertexSize,
        vertexCount,
        glShape: GLShape.TRIANGLE_FAN,
        textureCoordinates: Float32Array.from([
            // TODO Polygon texcoords
        ])
    });
};
