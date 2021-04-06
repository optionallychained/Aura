import { Transform2D } from '../../component/2d';
import { Vec2 } from '../../math';
import { CameraConfig } from '../camera.config';

/**
 * Interface describing the Camera2D Configuration object, adding 2D-relevant offset and projection configurations
 */
export interface Camera2DConfig extends CameraConfig {
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
export interface Camera2DFollowRules {
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
export interface Camera2DFollow {
    /** The Transform2D to follow */
    transform: Transform2D;
    /** The Camera2D Follow Rules */
    rules: DeepRequired<Camera2DFollowRules>;
}
