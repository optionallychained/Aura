import { Transform3D } from '../../component/3d';
import { Vec3 } from '../../math';
import { CameraConfig } from '../camera.config';

/**
 * Interface describing the Camera3D Configuration object, adding 3D offset and projection configurations
 */
export interface Camera3DConfig extends CameraConfig {
    /** Optional Camera offsets */
    offset?: {
        position?: Vec3;
        angles?: Vec3;
    };
    /** 3D Projection parameters */
    projection: {
        /** Mode - defaults to 'perspective' */
        mode: 'orthographic' | 'perspective';
        width: number;
        height: number;
        near: number;
        /** Optional far - defaults to (-near) for Orthographic Projection, and 'infinite' for Perspective */
        far?: number;
        /** Optional FOV - defaults to 90 when using Perspective Projection */
        fov?: number;
    }
}

/**
 * Interface describing the Camera3D Follow Rules object, setting out how a Camera3D should follow an Entity
 *
 * If not provided, default behavior will be used
 */
export interface Camera3DFollowRules {
    /** Whether or not to follow the Entity's positipn - all default to true */
    position?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
    /** Whether or not to follow the Entity's rotation - all default to false */
    angles?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
}

/**
 * Interface describing the Camera3D Follow specification
 */
export interface Camera3DFollow {
    /** The Transform3D to follow */
    transform: Transform3D;
    /** The Camera3D Follow Rules */
    rules: DeepRequired<Camera3DFollowRules>;
}
