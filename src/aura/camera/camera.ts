import { Transform2D } from '../component/2d/transform.component.2d';
import { Transform3D } from '../component/3d/transform.component.3d';
import { Entity } from '../entity/entity';
import { Mat3 } from '../math/mat3';
import { Mat4 } from '../math/mat4';
import { Camera2DConfig, Camera2DFollow, Camera2DFollowRules } from './2d/camera.2d.config';
import { Camera3DConfig, Camera3DFollow, Camera3DFollowRules } from './3d/camera.3d.config';

/**
 * Abstract class representing a Camera, broken down into concrete 2D and 3D variants in Camera2D and Camera3D
 *
 * Cameras carry and produce the Projection Matrix and View Matrix used in Shader uniforms
 *
 * Cameras are stored in the World, and multiple Cameras can be maintained at runtime with one 'active' at any given time
 *
 * Cameras may be controlled and transformed directly, and may be configured to follow Entities according to configurable rules
 *
 * @typeparam TConfig the specific configuration object type, allowing for the type-correct configuration of Cameras within the Game/World
 *
 * @see World
 * @see Camera2D
 * @see Camera3D
 */
export abstract class Camera<TConfig extends Camera2DConfig | Camera3DConfig> {

    /** Abstract projection matrix, to be implemented and managed and the type narrowed by the subclass */
    public abstract projection: Mat3 | Mat4;

    /** Abstract optional 'Follow' specification; to be implemented and the type narrowed by the subclass */
    protected abstract following: Camera2DFollow | Camera3DFollow | undefined;

    /** Abstract Transform Component, used as the implementation mechanism for View matrices, to be type narrowed by the subclass */
    protected abstract transform: Transform2D | Transform3D;

    /**
     * Constructor. Take and store the type-correct Camera Config
     *
     * @param config the type-correct Camera Config
     */
    constructor(protected readonly config: TConfig) { }

    /**
     * Getter for the Camera's name, as specified in its configuration
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Abstract camera follow configuration routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures that the rules are correctly typed for the consumer
     *
     * @param entity the Entity to follow
     * @param rules the FollowRules; the type will be narrowed by the subclass
     */
    public abstract attachTo(entity: Entity, rules?: Camera2DFollowRules | Camera3DFollowRules): void;

    /**
     * Abstract View Matrix computation routine, to be implemented and the return type narrowed by the subclass
     *
     * By not implementing generically, allows for different Camera types to approach View Matrix computation in distinct ways
     */
    public abstract getViewMatrix(): Mat3 | Mat4;

    /**
     * Detach the Camera from the Entity it's following by voiding the follow specification
     */
    public detach(): void {
        this.following = undefined;
    }

    /**
     * Abstraction for (Transform2D|Transform3D).reset() - reset all Camera transformations to the offsets provided in its config
     */
    public reset(): void {
        this.transform.reset();
    }
}
