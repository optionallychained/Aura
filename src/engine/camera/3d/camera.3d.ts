import { Transform3D } from '../../component/3d';
import { AuraError } from '../../core';
import { Entity } from '../../entity';
import { Mat4, Vec3 } from '../../math';
import { Camera } from '../camera';
import { Camera3DConfig, Camera3DFollow, Camera3DFollowRules } from './camera.3d.config';

/**
 * Concrete Camera3D, representing a 3D Camera and narrowing generic types to their corresponding 3D variants
 *
 * Supports both Orthographic and Perspecitve Projection approaches by way of the projection configuration member 'mode'
 */
export class Camera3D extends Camera<Camera3DConfig> {

    /** Concrete Mat4 projection matrix */
    public projection: Mat4;

    /** Concrete 3D 'Follow' specification */
    protected following: Camera3DFollow | undefined;

    /** Concrete 3D Transform */
    protected transform: Transform3D;

    /**
     * Constructor. Take the type-correct Camera3DConfig and pass it up to the parent class
     *
     * Initialise the projection matrix and Transform3D
     *
     * @param config the Camera3DConfig
     */
    constructor(config: Camera3DConfig) {
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

        // configure the Transform3D
        this.transform = new Transform3D(
            config.offset?.position,
            new Vec3(1, 1, 1),
            config.offset?.angles
        );
    }

    /**
     * Concrete Camera Follow configuration routine, narrowing the generic rules type to the Camera3DFollowRules for consumer safety
     *
     * Set out the default follow rules:
     *     - position.x - true
     *     - position.y - true
     *     - position.z - true
     *     - angles.x (pitch)   - true
     *     - angles.y (yaw)     - true
     *     - angles.z (roll)    - false
     *
     * @param entity the Entity to follow
     * @param rules the Camera3DFollowRules, specifying how the Camera should follow the Entity
     */
    public attachTo(entity: Entity, rules?: Camera3DFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent<Transform3D>('Transform3D'),
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
                class: 'Camera3D',
                method: 'attachTo',
                message: `Failed to attach to entity with tag ${entity.tag} : the Entity lacks a Transform3D`
            })
        }
    }

    /**
     * Concrete View Matrix computatio routine, narrowing the generic return type to Mat4
     *
     * @returns the View Matrix
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
     * Abstraction for (Transform3D).moveRight() - move the Camera along its right axis by an amount
     *
     * @param amount the amount to move
     */
    public moveRight(amount: number): void {
        this.transform.moveRight(amount);
    }

    /**
     * Abstraction for (Transform3D).moveUp() - move the Camera along its up axis by an amount
     *
     * @param amount the amount to move
     */
    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    /**
     * Abstraction for (Transform3D).moveForward() - move the Camera along its forward axis by an amount
     *
     * @param amount the amount to move
     */
    public moveForward(amount: number): void {
        this.transform.moveForward(amount);
    }

    /**
     * Abstraction for (Transform3D).translate() - move the Camera according to the world axes by a translation vector
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec3): void {
        this.transform.translate(translate);
    }

    /**
     * Abstraction for (Transform3D).rotateX() - rotate the Camera by an angle (radians) around its X axis
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateX(angle: number): void {
        this.transform.rotateX(angle);
    }

    /**
     * Abstraction for (Transform3D).rotateY() - rotate the Camera by an angle (radians) around its Y axis
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateY(angle: number): void {
        this.transform.rotateY(angle);
    }

    /**
     * Abstraction for (Transform3D).rotateZ() - rotate the Camera by an angle (radians) around its Z axis
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotateZ(angle: number): void {
        this.transform.rotateZ(angle);
    }

    /**
     * Abstraction for (Transform3D).rotate() - rotate the Camera by set of angles (radians) around its X, Y and Z axes
     *
     * @param angle the angles (radians) to rotate by
     */
    public rotate(angles: Vec3): void {
        this.transform.rotate(angles);
    }

    /**
     * Abstraction for (Transform3D).scaleBy() - 'zoom' the Camera by scaling by a factor relative to its current scale
     *
     * @param factor the factor to scale by
     */
    public zoom(factor: Vec3): void {
        this.transform.scaleBy(factor);
    }

    /**
     * Abstraction for (Transform3D).zoomTo() - 'zoom' the Camera by scaling to an absolute factor
     *
     * @param factor the factor to scale to
     */
    public zoomTo(factor: Vec3): void {
        this.transform.scaleTo(factor);
    }
}
