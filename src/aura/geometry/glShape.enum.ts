/**
 * Enum mapping convenient GLShape (drawing mode) names to their WebGLRenderingContext numerical counterparts
 *
 * Used in defining Geometry and setting the WebGLRenderer's rendering mode for drawing
 */
export enum GLShape {
    POINTS = WebGLRenderingContext.POINTS,
    LINES = WebGLRenderingContext.LINES,
    LINE_LOOP = WebGLRenderingContext.LINE_LOOP,
    LINE_STRIP = WebGLRenderingContext.LINE_STRIP,
    TRIANGLES = WebGLRenderingContext.TRIANGLES,
    TRIANGLE_STRIP = WebGLRenderingContext.TRIANGLE_STRIP,
    TRIANGLE_FAN = WebGLRenderingContext.TRIANGLE_FAN
}
