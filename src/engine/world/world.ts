import { Camera2D, Camera3D } from '../camera';
import { AuraError } from '../core';
import { EntityManager } from '../entity';
import { Vec2, Vec3 } from '../math';
import { WorldConfig2D, WorldConfig3D } from './world.config';

export abstract class World<TConfig extends WorldConfig2D | WorldConfig3D> extends EntityManager<TConfig> {

    // TODO readonly w/ mutable cast?
    public abstract activeCamera: Camera2D | Camera3D;

    protected abstract readonly cameras: Map<string, Camera2D | Camera3D>;

    constructor(config: TConfig) {
        super({
            name: 'world',
            ...config
        });

        // TODO review config storage at the EntityManager level
    }

    public abstract get dimensions(): Vec2 | Vec3;

    // TODO add name to camera as game states
    public addCamera(name: string, camera: Camera2D | Camera3D): void {
        this.cameras.set(name, camera);
    }

    public removeCamera(name: string): void {
        this.cameras.delete(name);
    }

    public switchToCamera(name: string): void {
        const camera = this.cameras.get(name);

        if (!camera) {
            throw new AuraError({
                class: 'World',
                method: 'switchToCamera',
                message: `Failed to switch to Camera with name ${name}`
            });
        }

        this.activeCamera = camera;
    }
}
