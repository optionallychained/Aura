import { Camera as Camera2D } from '../camera/2d/camera';
import { Camera as Camera3D } from '../camera/3d/camera';
import { AuraError } from '../core/aura.error';
import { EntityManager } from '../entity/entity.manager';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';
import { WorldConfig as WorldConfig2D } from './2d/world.config';
import { WorldConfig as WorldConfig3D } from './3d/world.config';

/**
 * Abstract WorldManager; an EntityManager implementing core functionality for Aura's World, including Camera and Game object management
 *
 * Broken down into concrete 2D and 3D variants, providing domain-specific behavior and type safety for Aura2D and Aura3D Games respectively
 *
 * @typeparam Config the specific 2D or 3D World configuration object type
 */
export abstract class WorldManager<Config extends WorldConfig2D | WorldConfig3D> extends EntityManager<Config> {

    /** Abstract 2D or 3D active Camera; to be type narrowed by the subclass */
    public abstract activeCamera: Camera2D | Camera3D;

    /** Abstract mapping of named 2D or 3D Cameras; to be type narrowed by the subclass */
    protected abstract readonly cameras: Map<string, Camera2D | Camera3D>;

    /**
     * Constructor. Pass a type-correct 2D or 3D WorldConfig to the parent class
     *
     * @param config the type-correct 2D or 3D World Config
     */
    constructor(config: Config) {
        super({
            name: 'world',
            ...config
        });
    }

    /** Abstract 2D or 3D World dimensions getter; to be implemented and type narrowed by the subclass */
    public abstract get dimensions(): Vec2 | Vec3;

    /**
     * Abstract 2D or 3D Camera addition; to be implemented and type narrowed by the subclass
     *
     * @param camera the 2D or 3D Camera to add
     */
    public abstract addCamera(camera: Camera2D | Camera3D): void;

    /**
     * Abstract 2D or 3D Camera retrieval; to be implemented and type narrowed by the subclass
     *
     * @param name the name of the Camera to retrieve
     *
     * @returns the named Camera
     */
    public abstract getCamera(name: string): Camera2D | Camera3D;

    /**
     * Remove a Camera by name
     *
     * @param name the name of the Camera to remove
     */
    public removeCamera(name: string): void {
        this.cameras.delete(name);
    }

    /**
     * Switch to the named Camera
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
