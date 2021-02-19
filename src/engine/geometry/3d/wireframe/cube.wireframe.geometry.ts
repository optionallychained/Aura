import { Geometry } from '../../geometry';
import { GLShape } from '../../glShape.enum';

export class Cube extends Geometry {

    constructor() {
        super({
            name: 'cube_wireframe',
            vertices: Float32Array.from([
                // TODO fix
                0, 0, 0,
                0.5, 0, 0,
                0.5, 0, 0,
                0.5, 0.5, 0,

                0.5, 0.5, 0,
                0, 0.5, 0,
                0, 0.5, 0,
                0, 0, 0,

                0, 0, 0,
                0, 0, 0.5,
                0.5, 0, 0,
                0.5, 0, 0.5,

                0.5, 0.5, 0,
                0.5, 0.5, 0.5,
                0, 0.5, 0,
                0, 0.5, 0.5,

                0, 0, 0.5,
                0.5, 0, 0.5,
                0.5, 0, 0.5,
                0.5, 0.5, 0.5,

                0.5, 0.5, 0.5,
                0, 0.5, 0.5,
                0, 0.5, 0.5,
                0, 0, 0.5
            ]),
            vertexSize: 3,
            vertexCount: 24,
            glShape: GLShape.LINE_LOOP
        });
    }
}
