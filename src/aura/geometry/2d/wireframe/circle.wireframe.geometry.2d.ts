import { POLYGON_WIREFRAME } from './polygon.wireframe.geometry.2d';

/**
 * Built-in 2D Wireframe Circle Geometry; a preset 30-sided Wireframe Polygon
 *
 * Using 30 as the lowest vertex count which produces a smooth circle
 */
export const CIRCLE_WIREFRAME = POLYGON_WIREFRAME(30, 'circle_wireframe');
