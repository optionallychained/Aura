import { ProtoGLError } from '../core';
import { EntityManager } from '../entity';
import { Vec2 } from '../math';
import { Camera2D } from './camera.2d';
import { Camera3D } from './camera.3d';
import { WorldConfig } from './world.config';

/**
 * Core World class; providing utility and management for Entities representing game objects
 */
export class World extends EntityManager<WorldConfig> {

    private camera2D: Camera2D;

    // TODO set up for multiple cameras, with only one 'active'

    constructor(config: WorldConfig) {
        super({
            name: 'world',
            ...config
        });

        this.camera2D = new Camera2D(
            config.camera?.position,
            config.camera?.angle,
            config.camera?.zoom
        );
    }

    public get dimensions(): Vec2 {
        return this.config.dimensions;
    }

    public getCamera2D(): Camera2D {
        return this.camera2D;
    }

    public getCamera3D(): Camera3D {
        const camera = this.filterEntitiesByTag(Camera3D.TAG)[0];

        if (!camera) {
            throw new ProtoGLError({
                class: 'World',
                method: 'getCamera',
                message: 'Failed to retrieve Camera3D'
            });
        }

        return camera;
    }
}
