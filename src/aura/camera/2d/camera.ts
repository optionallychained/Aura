import { Transform } from '../../component/2d/transform.component';
import { AuraError } from '../../core/aura.error';
import { Entity } from '../../entity/entity';
import { Mat3 } from '../../math/mat3';
import { Vec2 } from '../../math/vec2';
import { CameraBase } from '../camera.base';
import { CameraConfig, CameraFollow, CameraFollowRules } from './camera.config';

/**
 * Concrete 2D Camera, setting out 2D-specific properties and behavior, providing type safety for Aura3D
 */
export class Camera extends CameraBase<CameraConfig> {

    /** Concrete 2D projection matrix */
    public projection: Mat3;

    /** Concrete 2D CameraFollow specification */
    protected following: CameraFollow | undefined;

    /** Concrete 2D Transform Component, used as the View Matrix */
    protected transform: Transform;

    /**
     * Constructor. Pass a 2D CameraConfig to the parent class and initialize the projection and view matrices
     *
     * @param config the 2D CameraConfig
     */
    constructor(config: CameraConfig) {
        super(config);

        // configure the projection matrix
        this.projection = Mat3.projection(config.projection.width, config.projection.height);

        // configure the Transform2D
        this.transform = new Transform(
            config?.offset?.position,
            new Vec2(1, 1),
            config?.offset?.angle
        );
    }

    /**
     * Attach the 2D Camera to an Entity with the given 2D CameraFollowRules
     *
     * If no CameraFollowRules are provided, use defaults:
     *     - position.x - true
     *     - position.y - true
     *     - angle      - false
     *
     * @param entity the Entity to follow
     * @param rules the 2D CameraFollowRules to apply in following the Entity
     */
    public attachTo(entity: Entity, rules?: CameraFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent<Transform>('Transform'),
                rules: {
                    position: {
                        x: rules?.position?.x ?? true,
                        y: rules?.position?.y ?? true
                    },
                    angle: rules?.angle ?? false
                }
            };
        }
        catch (e) {
            // re-throw the Component Not Found .getComponent() error for clarity
            throw new AuraError({
                class: 'Camera',
                method: 'attachTo',
                message: `Failed to attach to Entity with tag ${entity.tag} : the Entity lacks a Transform2D`
            })
        }
    }

    /**
     * Compute the 2D Camera's View Matrix
     *
     * @returns the 2D View Matrix
     */
    public getViewMatrix(): Mat3 {
        let view: Mat3;

        if (this.following) {
            // if we're following, compose the View Matrix by individual transformation, accounting for the followed Entity's transformation
            view = Mat3.translate(new Mat3(), this.actualPosition());
            view = Mat3.rotate(view, this.actualAngle());
            view = Mat3.scale(view, this.transform.scale);
        }
        else {
            // if we're not following, our own computed Transform will do
            view = this.transform.compute();
        }

        // invert the transformation to produce the View Matrix
        return Mat3.invert(view) ?? view;
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
     * @param the amount to move by
     */
    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    /**
     * Move along both the right and up axes by a given 2D vector (relative to self)
     *
     * @param amounts the 2D vector to move by
     */
    public move(amounts: Vec2): void {
        if (amounts.x) {
            this.moveRight(amounts.x);
        }

        if (amounts.y) {
            this.moveUp(amounts.y);
        }
    }

    /**
     * Move by a given translation vector (relative to world axes)
     *
     * @param translate the translation vector
     */
    public translate(translate: Vec2): void {
        this.transform.translate(translate);
    }

    /**
     * Rotate by a given angle (radians)
     *
     * @param angle the angle to rotate by
     */
    public rotate(angle: number): void {
        this.transform.rotate(angle);
    }

    /**
     * 'Zoom' the Camera by scaling by a given factor (relative to current scale)
     *
     * @param factor the 2D factor to scale by
     */
    public zoom(factor: Vec2): void {
        this.transform.scaleBy(factor);
    }

    /**
     * 'Zoom' the Camera by scaling to a given absolute factor
     *
     * @param factor the 2D factor to scale to
     */
    public zoomTo(factor: Vec2): void {
        this.transform.scaleTo(factor);
    }

    /**
     * Retrieve the 2D Camera's actual position, accounting for the position of the followed Entity, if applicable
     *
     * @returns the actual position of the Camera2D
     *
     * Internal-use convenience method for calculating the Camera2D's actual position, accounting for the position of the followed Entity,
     *   if applicable
     *
     * @returns the actual position of the Camera2D
     */
    private actualPosition(): Vec2 {
        let { position } = this.transform;

        if (this.following) {
            const { transform, rules } = this.following;

            const addition = new Vec2(
                rules.position.x ? transform.position.x : 0,
                rules.position.y ? transform.position.y : 0
            );

            position = Vec2.add(position, addition);
        }

        return position;
    }

    /**
     * Internal-use convenience method for calculating the Camera2D's actual rotation, accounting for the rotation of the followed Entity,
     *   if applicable
     *
     * @returns the actual rotation of the Camera2D
     */
    private actualAngle(): number {
        let { angle } = this.transform;

        if (this.following) {
            angle += this.following.transform.angle * (this.following.rules.angle ? 1 : 0);
        }

        return angle;
    }
}
