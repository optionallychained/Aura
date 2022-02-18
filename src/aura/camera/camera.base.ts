import { Transform as Transform2D } from '../component/2d/transform.component';
import { Transform as Transform3D } from '../component/3d/transform.component';
import { Entity } from '../entity/entity';
import { Mat3 } from '../math/mat3';
import { Mat4 } from '../math/mat4';
import { CameraConfig as CameraConfig2D, CameraFollow as CameraFollow2D, CameraFollowRules as CameraFollowRules2D } from './2d/camera.config';
import { CameraConfig as CameraConfig3D, CameraFollow as CameraFollow3D, CameraFollowRules as CameraFollowRules3D } from './3d/camera.config';

/**
 * Abstract Camera; implementing the abstractable behaviour for both 2D and 3D Cameras
 *
 * Broken down into concrete 2D and 3D variants, allowing for domain-specific and type safe use in Aura2D and Aura3D respectively
 *
 * Cameras produce the Projection and View matrices used in Shader uniforms
 *
 * Cameras may be controlled and transformed directly, or may be configured to follow an Entity's Transform according to configurable rules
 *
 * @typeparam Config the specific 2D or 3D Camera configuration object
 */
export abstract class CameraBase<Config extends CameraConfig2D | CameraConfig3D> {

    /** Abstract 2D or 3D projection matrix; to be implemented and managed and type narrowed by the subclass */
    public abstract projection: Mat3 | Mat4;

    /** Abstract optional 2D or 3D CameraFollow specification; to be implemented and type narrowed by the subclass */
    protected abstract following: CameraFollow2D | CameraFollow3D | undefined;

    /** Abstract 2D or 3D Transform Component, used as the View Matrix; to be implemented and managed and type narrowed by the subclass */
    protected abstract transform: Transform2D | Transform3D;

    /**
     * Constructor. Take the type-correct 2D or 3D Camera Config
     *
     * @param config the type-correct 2D or 3D Camera Config
     */
    constructor(protected readonly config: Config) { }

    /**
     * Retrieve the Camera's name
     */
    public get name(): string {
        return this.config.name;
    }

    /**
     * Abstract 2D or 3D follow configuration; to be implemented and type narrowed by the subclass
     *
     * @param entity the Entity to follow
     * @param rules the 2D or 3D CameraFollowRules to apply in following the Entity
     */
    public abstract attachTo(entity: Entity, rules?: CameraFollowRules2D | CameraFollowRules3D): void;

    /**
     * Abstract 2D or 3D View Matrix computation; to be implemented and type narrowed by the subclass
     */
    public abstract getViewMatrix(): Mat3 | Mat4;

    /**
     * Detach the Camera from the Entity it's following
     */
    public detach(): void {
        this.following = undefined;
    }

    /**
     * Reset the Camera's Transform
     */
    public reset(): void {
        this.transform.reset();
    }
}
