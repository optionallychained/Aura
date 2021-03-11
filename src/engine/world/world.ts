import { EntityManager } from '../entity';
import { Mat3 } from '../math';
import { WorldConfig } from './world.config';

/**
 * Core World class; providing utility and management for Entities representing game objects
 *
 * // TODO this is where perspective/ortho/camera stuff will go
 *
 * // TODO continue on branch world
 * // TODO this, Font and UI might want to actually extend from EntityManager?
 */
export class World extends EntityManager<WorldConfig> {

    // TODO 2D only for the moment
    // TODO potentially temporary
    // public static VIEW = new Mat3();

    private camera = new Mat3();

    constructor(config: WorldConfig) {
        super({
            name: 'world',
            ...config
        });
    }

    public getCamera(): Mat3 {
        return this.camera;
    }

    public setCamera(camera: Mat3): void {
        this.camera = camera;
    }
}
