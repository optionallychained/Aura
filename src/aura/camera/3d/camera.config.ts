import { Transform } from '../../component/3d/transform.component';
import { Vec3 } from '../../math/vec3';
import { DeepRequired } from '../../aura.types';

/**
 * Interface describing a 3D Camera configuration object
 */
export interface CameraConfig {
    /** A name for the Camera */
    name: string;
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
 * Interface describing a 3D Camera follow configuration object, defining the way in which the Camera will follow an Entity
 */
export interface CameraFollowRules {
    /** Whether or not to follow the Entity's position - all default to true */
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
 * Interface describing a 3D Camera follow specification, defining what and how the Camera will follow
 */
export interface CameraFollow {
    /** The Transform3D to follow */
    transform: Transform;
    /** The Camera3D Follow Rules */
    rules: DeepRequired<CameraFollowRules>;
}
