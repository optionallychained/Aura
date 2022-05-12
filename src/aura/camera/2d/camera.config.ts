import { Transform } from '../../component/2d/transform.component';
import { Vec2 } from '../../math/vec2';
import { DeepRequired } from '../../aura.types';

/**
 * Interface describing the Camera2D Configuration object, adding 2D-relevant offset and projection configurations
 */
export interface CameraConfig {
    /** A name for the Camera */
    name: string;
    /** Optional Camera offsets */
    offset?: {
        position?: Vec2;
        angle?: number;
    };
    /** 2D Projection parameters */
    projection: {
        width: number;
        height: number;
    };
}

/**
 * Interface describing the Camera2D Follow Rules object, setting out how a Camera2D should follow an Entity
 *
 * If not provided, default behavior will be used
 */
export interface CameraFollowRules {
    /** Whether or not to follow the Entity's position - both default to true */
    position?: {
        x?: boolean;
        y?: boolean;
    };
    /** Whether or not to follow the Entity's rotation - defaults to false */
    angle?: boolean;
}

/**
 * Interface describing the Camera2D Follow specification
 */
export interface CameraFollow {
    /** The Transform to follow */
    transform: Transform;
    /** The Camera2D Follow Rules */
    rules: DeepRequired<CameraFollowRules>;
}
