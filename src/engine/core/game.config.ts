import { Vec3 } from '../math/vec3';

/**
 * Interface desciribing the main Game Configuration object
 */
export interface GameConfig {
    /** Game window width; default value is window.innerWidth */
    width?: number;
    /** Game window height; default value is window.innerHeight */
    height?: number;
    /** Game Canvas ID. If not provided, a Canvas will be created */
    canvasId?: string;
    /** Game background color; default value is black */
    backgroundColor?: Vec3;
    /** Game init function; none is provided by default */
    init?: () => void
}
