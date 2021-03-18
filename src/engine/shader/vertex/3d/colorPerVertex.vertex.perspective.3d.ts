import { UniformType } from '../../uniformType.enum';
import { UniformVariation } from '../../uniformVariation.enum';
import { VertexShader } from '../../vertex';

/**
 * Built-in basic 3D Vertex Shader, transforming vertices by a uniform Mat3 and setting a varying VertexColor
 */
export const VERTEX_COLOR_PER_VERTEX_PERSPECTIVE_3D = new VertexShader({
    name: 'vertex_color_per_vertex_perspective_3d',
    source: `
        precision mediump float;

        uniform mat4 u_Transform3D;
        uniform mat4 u_Perspective;
        uniform mat4 u_View3D;

        attribute vec3 a_Position;
        attribute vec4 a_VertexColor;

        varying vec4 v_Color;

        void main() {
            v_Color = a_VertexColor;

            gl_PointSize = 1.0;

            gl_Position = u_Perspective * u_View3D * u_Transform3D * vec4(a_Position, 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 3
        },
        {
            name: 'a_VertexColor',
            size: 4
        }
    ],
    uniforms: [
        {
            name: 'u_Transform3D',
            type: UniformType.MAT4,
            variation: UniformVariation.ENTITY
        },
        {
            name: 'u_Perspective',
            type: UniformType.MAT4,
            variation: UniformVariation.STATIC
        },
        {
            name: 'u_View3D',
            type: UniformType.MAT4,
            variation: UniformVariation.STATIC
        }
    ]
});
