export const VERTEX_BASIC = `
    uniform mat3 u_Transform;

    attribute vec2 a_Position;

    void main() {
        gl_Position = vec4(u_Transform * vec3(a_Position, 1.0), 1.0);
    }
`;
