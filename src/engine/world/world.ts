import { ProtoGLError } from '../core';
import { EntityManager } from '../entity';
import { Camera2D } from './camera.2d';
import { Camera3D } from './camera.3d';
import { WorldConfig } from './world.config';

/**
 * Core World class; providing utility and management for Entities representing game objects
 *
 * // TODO continue on branch world
 * // TODO this, Font and UI might want to actually extend from EntityManager?
 */
export class World extends EntityManager<WorldConfig> {

    // TODO set up for multiple cameras, with only one 'active'

    constructor(config: WorldConfig) {
        super({
            name: 'world',
            ...config,

            initialEntities: [
                new Camera2D(),
                new Camera3D()
            ]
        });
    }

    public getCamera2D(): Camera2D {
        const camera = this.filterEntitiesByTag(Camera2D.TAG)[0];

        if (!camera) {
            throw new ProtoGLError({
                class: 'World',
                method: 'getCamera',
                message: 'Failed to retrieve Camera2D'
            });
        }

        return camera;
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

    public setCamera2D(camera: Camera2D): void {
        this.removeEntity(this.filterEntitiesByTag(Camera2D.TAG)[0]);

        this.addEntity(camera);
    }

    public setCamera3D(camera: Camera3D): void {
        this.removeEntity(this.filterEntitiesByTag(Camera3D.TAG)[0]);

        this.addEntity(camera);
    }
}
