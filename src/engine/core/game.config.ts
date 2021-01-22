import { Vec3 } from '../math/vec3';

export interface GameConfig {
    width?: number;
    height?: number;
    canvasId?: string;
    background?: Vec3;
    init?: () => void
}
