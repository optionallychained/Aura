import { Transform3D } from '../../component/3d';
import { Vec3 } from '../../math';

export interface Camera3DConfig {
    offset?: {
        position?: Vec3;
        angles?: Vec3;
    };
    projection: {
        mode: 'ortho' | 'perspective';
        width: number;
        height: number;
        near: number;
        far: number;
        fov?: number;
    }
}

export interface Camera3DFollowRules {
    position?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
    angles?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
}

export interface Camera3DFollow {
    transform: Transform3D;
    rules: DeepRequired<Camera3DFollowRules>;
}
