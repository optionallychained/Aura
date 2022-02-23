import { Camera } from '../../camera/3d/camera';
import { AuraError } from '../../core/aura.error';
import { Vec3 } from '../../math/vec3';
import { WorldManager } from '../world.manager';
import { WorldConfig } from './world.config';

/**
 * Concrete 3D World, a WorldManager setting out 3D-specific properties and behavior, providing type safety for Aura3D
 *
 * NB: the default 3D Camera uses Perspective Projection
 *
 * NB: World (0,0,0) is considered to be in the center, with:
 *     - positive X -> right
 *     - positive Y -> up
 *     - positive Z -> "out"
 * ...and World coordinate limits:
 *     - left   : -dimensions.x / 2
 *     - right  : dimensions.x / 2
 *     - bottom : -dimensions.y / 2
 *     - top    : dimensions.y / 2
 *     - far    : -dimensions.z / 2
 *     - near   : dimensions.z / 2
 */
export class World extends WorldManager<WorldConfig> {

    /** Concrete 3D active Camera */
    public readonly activeCamera: Camera;

    /** Concrete mapping of named 3D Cameras */
    protected readonly cameras = new Map<string, Camera>();

    /**
     * Constructor. Pass a 3D WorldConfig to the parent class and initialise the default 3D Camera
     *
     * @param config the 3D WorldConfig
     */
    constructor(config: WorldConfig) {
        super(config);

        const defaultCamera = new Camera({
            name: 'default',
            offset: config.camera.offset,
            projection: config.camera.projection
        });

        this.addCamera(defaultCamera);
        this.activeCamera = defaultCamera;
    }

    /**
     * Get the 3D World dimensions
     */
    public get dimensions(): Vec3 {
        return this.config.dimensions;
    }

    /**
     * Add a 2D Camera to the World
     *
     * @param camera the 3D Camera to add
     */
    public addCamera(camera: Camera): void {
        this.cameras.set(camera.name, camera);
    }

    /**
     * Retrieve a named 3D Camera
     *
     * Throws an error if the Camera is not found for runtime safety
     *
     * @param name the name of the 3D Camera to retrieve
     *
     * @returns the named 3D Camera
     */
    public getCamera(name: string): Camera {
        const camera = this.cameras.get(name);

        if (!camera) {
            throw new AuraError({
                class: 'World',
                method: 'getCamera',
                message: `Failed to retrieve 3D Camera with name ${name}`
            });
        }

        return camera;
    }
}
