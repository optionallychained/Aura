import { Transform2D } from '../../component/2d';
import { AuraError } from '../../core';
import { Entity } from '../../entity';
import { Mat3, Vec2 } from '../../math';
import { Camera } from '../camera';
import { Camera2DConfig, Camera2DFollow, Camera2DFollowRules } from './camera.2d.config';

export class Camera2D extends Camera<Camera2DConfig> {

    public projection: Mat3;

    protected following: Camera2DFollow | undefined;

    private transform: Transform2D;

    constructor(config: Camera2DConfig) {
        super(config);

        this.projection = Mat3.projection(config.projection.width, config.projection.height);

        this.transform = new Transform2D(
            config?.offset?.position,
            new Vec2(1, 1),
            config?.offset?.angle
        );
    }

    public attachTo(entity: Entity, rules?: Camera2DFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent(Transform2D),
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
            throw new AuraError({
                class: 'Camera2D',
                method: 'attachTo',
                message: `Failed to attach to Entity with tag ${entity.tag} : the Entity lacks a Transform2D`
            })
        }
    }

    public moveRight(amount: number): void {
        this.transform.moveRight(amount);
    }

    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    public translate(translate: Vec2): void {
        this.transform.translate(translate);
    }

    public rotate(angle: number): void {
        this.transform.rotate(angle);
    }

    public zoom(factor: Vec2): void {
        this.transform.scaleBy(factor);
    }

    public zoomTo(factor: Vec2): void {
        this.transform.scaleTo(factor);
    }

    public reset(): void {
        this.transform.reset();
    }

    public getViewMatrix(): Mat3 {
        let view: Mat3;

        if (this.following) {
            const { transform } = this.following;

            view = Mat3.translate(new Mat3(), this.actualPosition());
            view = Mat3.rotate(view, this.actualAngle());
            view = Mat3.scale(view, this.transform.scale);
        }
        else {
            view = this.transform.compute();
        }

        return Mat3.invert(view) ?? view;
    }

    private actualPosition(): Vec2 {
        let position = Vec2.add(this.transform.position, this.transform.offsetPosition);

        if (this.following) {
            const { transform, rules } = this.following;

            const tPosition = Vec2.add(transform.position, transform.offsetPosition);

            const addition = new Vec2(
                rules.position.x ? tPosition.x : 0,
                rules.position.y ? tPosition.y : 0
            );

            position = Vec2.add(position, addition);
        }

        return position;
    }

    private actualAngle(): number {
        let { angle } = this.transform;

        if (this.following) {
            angle += this.following.transform.angle * (this.following.rules.angle ? 1 : 0);
        }

        return angle;
    }
}
