import { Camera3D } from '../../camera';
import { Vec3 } from '../../math';
import { World } from '../world';
import { WorldConfig3D } from '../world.config';

/**
 * Concrete World3D, a World EntityManager setting out the 3D-specific properties and behavior of World object management for 3D Games
 *
 * Implements and type-narrows the abstract elements of the parent class World so as to produce consumer type-safety on things like Camera
 *   management
 */
export class World3D extends World<WorldConfig3D> {

    /** Concrete 3D active Camera */
    public readonly activeCamera: Camera3D;

    /** Concrete mapping of 3D Cameras */
    protected readonly cameras = new Map<string, Camera3D>();

    /**
     * Constructor. Take the type-correct WorldConfig3D and pass it up to the parent class
     *
     * Initialise the default Camera3D based on the 3D-specific configuration
     *
     * @param config the WorldConfig3D
     */
    constructor(config: WorldConfig3D) {
        super(config);

        const defaultCamera = new Camera3D(
            config.cameraOffsets?.position,
            config.cameraOffsets?.angles
        );

        this.cameras.set('default', defaultCamera);
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
    public addCamera(name: string, camera: Camera3D): void {
        this.cameras.set(name, camera);
    }
}
