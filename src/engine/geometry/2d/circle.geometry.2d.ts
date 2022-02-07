import { POLYGON } from './polygon.geometry.2d';

/**
 * Built-in 2D Circle Geometry; a preset 30-sided Polygon
 *
 * Using 30 as the lowest vertex count which produces a smooth circle
 */
export const CIRCLE = POLYGON(30, 'circle');
