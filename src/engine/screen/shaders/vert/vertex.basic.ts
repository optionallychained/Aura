export const VERTEX_BASIC = `
    attribute vec2 a_Position;

    void main() {
        gl_Position = vec4(a_Position, 1.0, 1.0);
    }
`;
