import { Entity } from '../entity';
import { Mat3, Mat4 } from '../math';
import { Camera2DConfig, Camera2DFollow, Camera2DFollowRules } from './2d';
import { Camera3DConfig, Camera3DFollow, Camera3DFollowRules } from './3d';

export abstract class Camera<TConfig extends Camera2DConfig | Camera3DConfig> {
    public abstract projection: Mat3 | Mat4;

    protected abstract following: Camera2DFollow | Camera3DFollow | undefined;

    constructor(protected readonly config: TConfig) { }

    public abstract attachTo(entity: Entity, rules?: Camera2DFollowRules | Camera3DFollowRules): void;

    public detach(): void {
        this.following = undefined;
    }

    public abstract getViewMatrix(): Mat3 | Mat4;

    public get name(): string {
        return this.config.name;
    }
}
