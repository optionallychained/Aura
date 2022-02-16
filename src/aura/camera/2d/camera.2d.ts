import { Transform2D } from '../../component/2d/transform.component.2d';
import { AuraError } from '../../core/aura.error';
import { Entity } from '../../entity/entity';
import { Mat3 } from '../../math/mat3';
import { Vec2 } from '../../math/vec2';
import { Camera } from '../camera';
import { Camera2DConfig, Camera2DFollow, Camera2DFollowRules } from './camera.2d.config';

/**
 * Concrete Camera2D, representing a 2D Camera and narrowing generic types to their corresponding 2D variants
 */
export class Camera2D extends Camera<Camera2DConfig> {

    /** Concrete Mat3 projection matrix */
    public projection: Mat3;

    /** Concrete 2D 'Follow' specification */
    protected following: Camera2DFollow | undefined;

    /** Concrete 2D Transform */
    protected transform: Transform2D;

    /**
     * Constructor. Take the type-correct Camera2DConfig and pass it up to the parent class
     *
     * Initialise the projection matrix and Transform2D
     *
     * @param config the Camera2DConfig
     */
    constructor(config: Camera2DConfig) {
        super(config);

        // configure the projection matrix
        this.projection = Mat3.projection(config.projection.width, config.projection.height);

        // configure the Transform2D
        this.transform = new Transform2D(
            config?.offset?.position,
            new Vec2(1, 1),
            config?.offset?.angle
        );
    }

    /**
     * Concrete Camera Follow configuration routine, narrowing the generic rules type to Camera2DFollowRules for consumer safety
     *
     * Set out the default follow rules:
     *     - position.x - true
     *     - position.y - true
     *     - angle      - false
     *
     * @param entity the Entity to follow
     * @param rules the Camera2DFollowRules, specifying how the Camera should follow the Entity
     */
    public attachTo(entity: Entity, rules?: Camera2DFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent<Transform2D>('Transform2D'),
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
                class: 'Camera2D',
                method: 'attachTo',
                message: `Failed to attach to Entity with tag ${entity.tag} : the Entity lacks a Transform2D`
            })
        }
    }

    /**
    * Concrete View Matrix computation routine, narrowing the generic return type to Mat3
    *
    * @returns the View Matrix
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
     * Abstraction for (Transform2D).moveRight() - move the Camera along its right axis by an amount
     *
     * @param amount the amount to move
     */
    public moveRight(amount: number): void {
        this.transform.moveRight(amount);
    }

    /**
     * Abstraction for (Transform2D).moveUp() - move the Camera along its up axis by an amount
     *
     * @param amount the amount to move
     */
    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    /**
     * Abstraction for (Transform2D).translate() - move the Camera according to the world axes by a translation vector
     *
     * @param amount the translation vector
     */
    public translate(translate: Vec2): void {
        this.transform.translate(translate);
    }

    /**
     * Abstraction for (Transform2D).rotate() - rotate the Camera by an angle (radians)
     *
     * @param angle the angle (radians) to rotate by
     */
    public rotate(angle: number): void {
        this.transform.rotate(angle);
    }

    /**
     * Abstraction for (Transform2D).scaleBy() - 'zoom' the Camera by scaling by a factor relative to its current scale
     *
     * @param factor the factor to scale by
     */
    public zoom(factor: Vec2): void {
        this.transform.scaleBy(factor);
    }

    /**
     * Abstraction for (Transform2D).scaleTo() - 'zoom' the Camera by scaling to an absolute factor
     *
     * @param factor the factor to scale to
     */
    public zoomTo(factor: Vec2): void {
        this.transform.scaleTo(factor);
    }

    /**
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
