import { ProtoGLError } from '../core';
import { EntityManager } from '../entity';
import { Vec2, Vec3 } from '../math';
import { Camera2D } from './camera.2d';
import { Camera3D } from './camera.3d';
import { WorldConfig } from './world.config';

/**
 * Core World class; providing utility and management for Entities representing game objects
 */
export class World extends EntityManager<WorldConfig> {

    private camera2D: Camera2D;
    private camera3D: Camera3D;

    // TODO set up for multiple cameras, with only one 'active'

    constructor(config: WorldConfig) {
        super({
            name: 'world',
            ...config
        });

        this.camera2D = new Camera2D(
            // config.camera?.position,
            // config.camera?.zoom,
            // config.camera?.angle,
        );

        this.camera3D = new Camera3D(
            config.camera?.position,
            new Vec3(1, 1, 1),
            config.camera?.angle
        )
    }

    public get dimensions(): Vec3 {
        return this.config.dimensions;
    }

    public getCamera2D(): Camera2D {
        return this.camera2D;
    }

    public getCamera3D(): Camera3D {
        return this.camera3D;
    }
}
