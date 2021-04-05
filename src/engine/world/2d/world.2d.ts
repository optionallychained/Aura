import { Camera2D } from '../../camera/2d';
import { Vec2 } from '../../math';
import { World } from '../world';
import { World2DConfig } from './world.2d.config';

/**
 * Concrete World2D, a World EntityManager setting out the 2D-specific properties and behavior of World object management for 2D Games
 *
 * Implements and type-narrows the abstract elements of the parent class World so as to produce consumer type-safety on things like Camera
 *   management
 */
export class World2D extends World<World2DConfig> {

    /** Concrete 2D active Camera */
    public readonly activeCamera: Camera2D;

    /** Concrete mapping of 2D Cameras */
    protected readonly cameras = new Map<string, Camera2D>();

    /**
     * Constructor. Take the type-correct WorldConfig2D and pass it up to the parent class
     *
     * Initialise the default Camera2D based on the 2D-specific configuration
     *
     * @param config the WorldConfig2D
     */
    constructor(config: World2DConfig) {
        super(config);

        const defaultCamera = new Camera2D({
            name: 'default',
            offset: config.camera?.offset,
            projection: config.camera?.projection ?? {
                width: config.dimensions.x,
                height: config.dimensions.y
            }
        });

        this.addCamera(defaultCamera);
        this.activeCamera = defaultCamera;
    }

    /**
     * Concrete World dimension getter; narrowing the generic type to Vec2 for consumer safety
     */
    public get dimensions(): Vec2 {
        return this.config.dimensions;
    }

    /**
     * Concrete Camera addition routine, narrowing the generic type to ensure the correct configuration of a World2D
     *
     * @param name the name of the Camera to add
     * @param camera the Camera2D to add
     */
    public addCamera(camera: Camera2D): void {
        this.cameras.set(camera.name, camera);
    }
}
