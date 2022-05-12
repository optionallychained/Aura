import { Transform } from '../../component/3d/transform.component';
import { AuraError } from '../../core/aura.error';
import { Entity } from '../../entity/entity';
import { Mat4 } from '../../math/mat4';
import { Vec3 } from '../../math/vec3';
import { CameraBase } from '../camera.base';
import { CameraConfig, CameraFollow, CameraFollowRules } from './camera.config';

/**
 * Concrete 3D Camera, setting out 3D-specific properties and behavior, providing type safety for Aura3D
 *
 * Supports both Orthographic and Perspecitve Projection approaches by way of the projection configuration member 'mode'
 */
export class Camera extends CameraBase<CameraConfig> {

    /** Concrete 3D projection matrix */
    public projection: Mat4;

    /** Concrete 3D CameraFollow specification */
    protected following: CameraFollow | undefined;

    /** Concrete 3D Transform Component, used as the View Matrix */
    protected transform: Transform;

    /**
     * Constructor. Pass a 2D CameraConfig to the parent class and initialize the projection and view matrices
     *
     * @param config the 3D CameraConfig
     */
    constructor(config: CameraConfig) {
        super(config);

        if (config.projection.mode === 'orthographic') {
            // configure an orthographic projection matrix
            this.projection = Mat4.ortho(
                -config.projection.width / 2,
                config.projection.width / 2,
                -config.projection.height / 2,
                config.projection.height / 2,
                config.projection.near,
                config.projection.far ?? -config.projection.near
            );
        }
        else {
            // configure a perspective projection matrix
            // FOV defaults to 90
            this.projection = Mat4.perspective(
                config.projection.fov ?? 90,
                config.projection.width / config.projection.height,
                config.projection.near,
                config.projection.far
            );
        }

        // configure the Transform
        this.transform = new Transform(
            config.offset?.position,
            new Vec3(1, 1, 1),
            config.offset?.angles
        );
    }

    /**
     * Attach the 3D Camera to an Entity with the given 3D CameraFollowRules
     *
     * If no CameraFollowRules are provided, use defaults:
     *     - position.x         - true
     *     - position.y         - true
     *     - position.z         - true
     *     - angles.x (pitch)   - true
     *     - angles.y (yaw)     - true
     *     - angles.z (roll)    - false
     *
     * @param entity the Entity to follow
     * @param rules the 3D CameraFollowRules to apply in following the Entity
     */
    public attachTo(entity: Entity, rules?: CameraFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent(Transform),
                rules: {
                    position: {
                        x: rules?.position?.x ?? true,
                        y: rules?.position?.y ?? true,
                        z: rules?.position?.z ?? true
                    },
                    angles: {
                        x: rules?.angles?.x ?? true,
                        y: rules?.angles?.y ?? true,
                        z: rules?.angles?.z ?? false
                    }
                }
            };
        }
        catch (e) {
            // re-throw the Component Not Found .getComponent() error for clarity
            throw new AuraError({
                class: 'Camera',
                method: 'attachTo',
                message: `Failed to attach to entity with tag ${entity.tag} : the Entity lacks a Transform`
            })
        }
    }

    /**
     * Compute the 3D Camera's View Matrix
     *
     * @returns the 3D View Matrix
     */
    public getViewMatrix(): Mat4 {
        let view: Mat4;

        if (this.following) {
            // if we're following, compose the View Matrix by applying our own transformations over the followed Entity's transformation
            //   matrix
            const { transform } = this.following;

            // zero out the scale factor of the followed' Entity's transform
            view = Mat4.scale(transform.compute(), Vec3.invert(transform.scale));

            // further translate and rotate the followed' entity's transformations by own our transform
            view = Mat4.translate(view, this.transform.position);
            view = Mat4.rotateX(view, this.transform.angles.x);
            view = Mat4.rotateY(view, this.transform.angles.y);
            view = Mat4.rotateZ(view, this.transform.angles.z);
        }
        else {
            // if we're not following, our own computed Transform will do
            view = this.transform.compute();
        }

        // invert the transformation to produce the View Matrix
        return Mat4.invert(view) ?? view;
    }

    /**
     * Move along the right axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveRight(amount: number): void {
        this.transform.moveRight(amount);
    }

    /**
     * Move along the up axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    /**
     * Move along the forward axis by a given amount (relative to self)
     *
     * @param amount the amount to move by
     */
    public moveForward(amount: number): void {
        this.transform.moveForward(amount);
    }

    /**
     * Move along all three axes by a given 3D vector (relative to self)
     *
     * @param amounts the 3D vector to move by
     */
    public move(amounts: Vec3): void {
        if (amounts.x) {
            this.moveRight(amounts.x);
        }

        if (amounts.y) {
            this.moveUp(amounts.y);
        }

        if (amounts.z) {
            this.moveForward(amounts.z);
        }
    }

    /**
     * Move by a given translation vector (relative to world axes)
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec3): void {
        this.transform.translate(translate);
    }

    /**
     * Rotate by a given angle (radians) around the X axis; pitch
     *
     * @param angle the angle to rotate by
     */
    public rotateX(angle: number): void {
        this.transform.rotateX(angle);
    }

    /**
     * Rotate by a given angle (radians) around the Y axis; yaw
     *
     * @param angle the angle to rotate by
     */
    public rotateY(angle: number): void {
        this.transform.rotateY(angle);
    }

    /**
     * Rotate by a given angle (radians) around the Z axis; roll
     *
     * @param angle the angle to rotate by
     */
    public rotateZ(angle: number): void {
        this.transform.rotateZ(angle);
    }

    /**
     * Rotate around all three axes by 3 given angles (radians)
     *
     * @param angles the X, Y and Z angles to rotate by
     */
    public rotate(angles: Vec3): void {
        this.transform.rotate(angles);
    }

    /**
     * 'Zoom' the Camera by scaling by a given factor (relative to current scale)
     *
     * @param factor the 3D factor to scale by
     */
    public zoom(factor: Vec3): void {
        this.transform.scaleBy(factor);
    }

    /**
     * 'Zoom' the Camera by scaling to a given absolute factor
     *
     * @param factor the 3D factor to scale to
     */
    public zoomTo(factor: Vec3): void {
        this.transform.scaleTo(factor);
    }
}
