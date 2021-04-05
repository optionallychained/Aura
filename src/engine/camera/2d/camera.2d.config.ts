import { Transform2D } from '../../component/2d';
import { Vec2 } from '../../math';

export interface Camera2DConfig {
    offset?: {
        position?: Vec2;
        angle?: number;
    };
    projection: {
        width: number;
        height: number;
    };
}

export interface Camera2DFollowRules {
    position?: {
        x?: boolean;
        y?: boolean;
    };
    angle?: boolean;
}

export interface Camera2DFollow {
    transform: Transform2D;
    rules: DeepRequired<Camera2DFollowRules>;
}
