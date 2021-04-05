import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { VertexShader } from '../vertex.shader';

/**
 * Built-in basic 2D Vertex Shader, transforming vertices by a uniform Mat3
 */
export const VERTEX_BASIC_2D = new VertexShader({
    name: 'vertex_basic_2d',
    source: `
        uniform mat3 u_Transform2D;
        uniform mat3 u_Projection;
        uniform mat3 u_View;

        attribute vec2 a_Position;

        void main() {
            gl_PointSize = 1.0;

            gl_Position = vec4(u_Projection * u_View * u_Transform2D * vec3(a_Position, 1.0), 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 2
        }
    ],
    uniforms: [
        {
            name: 'u_Transform2D',
            type: UniformType.MAT3,
            variation: UniformVariation.ENTITY
        },
        {
            name: 'u_Projection',
            type: UniformType.MAT3,
            variation: UniformVariation.STATIC
        },
        {
            name: 'u_View',
            type: UniformType.MAT3,
            variation: UniformVariation.STATIC
        }
    ]
});
