import { Camera3D } from '../../camera/3d/camera.3d';
import { AuraError } from '../../core/aura.error';
import { Vec3 } from '../../math/vec3';
import { World } from '../world';
import { World3DConfig } from './world.3d.config';

/**
 * Concrete World3D, a World EntityManager setting out the 3D-specific properties and behavior of World object management for 3D Games
 *
 * Implements and type-narrows the abstract elements of the parent class World so as to produce consumer type-safety on things like Camera
 *   management
 *
 * NB: the default 3D Camera uses Perspective Projection
 */
export class World3D extends World<World3DConfig> {

    /** Concrete 3D active Camera */
    public readonly activeCamera: Camera3D;

    /** Concrete mapping of 3D Cameras */
    protected readonly cameras = new Map<string, Camera3D>();

    /**
     * Constructor. Take the type-correct World3DConfig and pass it up to the parent class
     *
     * Initialise the default Camera3D based on the 3D-specific configuration
     *
     * @param config the World3DConfig
     */
    constructor(config: World3DConfig) {
        super(config);

        // configure, add and make active the default Camera3D
        const defaultCamera = new Camera3D({
            name: 'default',
            offset: config.camera.offset,
            projection: config.camera.projection
        });

        this.addCamera(defaultCamera);
        this.activeCamera = defaultCamera;
    }

    /**
     * Concrete World dimension getter; narrowing the generic type to Vec3 for consumer safety
     */
    public get dimensions(): Vec3 {
        return this.config.dimensions;
    }

    /**
     * Concrete Camera addition routine, narrowing the generic type to ensure the correct configuration of a World3D
     *
     * @param name the name of the Camera to add
     * @param camera the Camera3D to add
     */
    public addCamera(camera: Camera3D): void {
        this.cameras.set(camera.name, camera);
    }

    /**
     * Concrete Camera retrieval routine, narrowing the return type to Camera3D
     *
     * Throws an error if the Camera is not found for runtime safety
     *
     * @param name the name of the Camera to retrieve
     *
     * @returns the retreived Camera3D
     */
    public getCamera(name: string): Camera3D {
        const camera = this.cameras.get(name);

        if (!camera) {
            throw new AuraError({
                class: 'World3D',
                method: 'getCamera',
                message: `Failed to retrieve 3D Camera with name ${name}`
            });
        }

        return camera;
    }
}
