import { Camera2D } from '../camera/2d';
import { Camera3D } from '../camera/3d';
import { AuraError } from '../core';
import { EntityManager } from '../entity';
import { Vec2, Vec3 } from '../math';
import { World2DConfig } from './2d';
import { World3DConfig } from './3d';

/**
 * Abstract World, an EntityManager which sets out the fundamental properties and runtime behavior of World object management, and broken
 *   down into concrete 2D and 3D variants for use in Game2D and Game3D respectively
 *
 * Implements World-specific utilities like Camera management and projection matrix configuration
 *
 * @typeparam TConfig the specific configuration object type, allowing for the type-correct configuration of the World Manager
 */
export abstract class World<TConfig extends World2DConfig | World3DConfig> extends EntityManager<TConfig> {

    /** Abstract reference to the active Camera, to be implemented and managed and the type to be narrowed by the subclass */
    public abstract activeCamera: Camera2D | Camera3D;

    /** Abstract mapping of 2D or 3D Cameras, to be implemented and managed and the type narrowed by the subclass */
    protected abstract readonly cameras: Map<string, Camera2D | Camera3D>;

    /**
     * Constructor. Take the type-correct World Config and pass it up to the parent class
     *
     * @param config the type-correct World Config
     */
    constructor(config: TConfig) {
        super({
            name: 'world',
            ...config
        });
    }

    /** Abstract getter for the World dimensions, to be implemented and type narrowed by the subclass */
    public abstract get dimensions(): Vec2 | Vec3;

    /**
     * Abstract Camera addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D Cameras
     *
     * @param name a name for the Camera
     * @param camera the Camera2D or Camera3D to add; the type will be narrowed by the subclass
     */
    public abstract addCamera(camera: Camera2D | Camera3D): void;

    /**
     * Remove a Camera by name
     *
     * @param name the name of the Camera to remove
     */
    public removeCamera(name: string): void {
        this.cameras.delete(name);
    }

    /**
     * Switch to the Camera given by name
     *
     * Throws an error if the desired Camera is not found for runtime safety
     *
     * @param name the name of the Camera to switch to
     */
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
