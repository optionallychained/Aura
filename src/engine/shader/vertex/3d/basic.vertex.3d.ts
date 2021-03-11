import { UniformType } from '../../uniformType.enum';
import { ShaderVariableVariation } from '../../shaderVariableVariation.enum';
import { VertexShader } from '../../vertex';

/**
 * Built-in basic 3D Vertex Shader, transforming vertices by a uniform Mat3
 */
export const VERTEX_BASIC_3D = new VertexShader({
    name: 'vertex_basic_3d',
    source: `
        precision mediump float;

        uniform mat4 u_Transform3D;

        attribute vec3 a_Position;

        void main() {
            gl_PointSize = 1.0;

            gl_Position = u_Transform3D * vec4(a_Position, 1.0);
        }
    `,
    attributes: [
        {
            name: 'a_Position',
            size: 3
        }
    ],
    uniforms: [
        {
            name: 'u_Transform3D',
            type: UniformType.MAT4,
            variation: ShaderVariableVariation.ENTITY
        }
    ]
});
