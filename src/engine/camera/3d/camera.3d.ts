import { Transform3D } from '../../component/3d';
import { AuraError } from '../../core';
import { Entity } from '../../entity';
import { Mat4, Vec3 } from '../../math';
import { Camera } from '../camera';
import { Camera3DConfig, Camera3DFollow, Camera3DFollowRules } from './camera.3d.config';

export class Camera3D extends Camera<Camera3DConfig> {

    public projection: Mat4;

    protected following: Camera3DFollow | undefined;

    private transform: Transform3D;

    constructor(config: Camera3DConfig) {
        super(config);

        if (config.projection.mode === 'ortho') {
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
            this.projection = Mat4.perspective(
                config.projection.fov ?? 90,
                config.projection.width / config.projection.height,
                config.projection.near,
                config.projection.far
            );
        }

        this.transform = new Transform3D(
            config.offset?.position,
            new Vec3(1, 1, 1),
            config.offset?.angles
        );
    }

    public attachTo(entity: Entity, rules?: Camera3DFollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent(Transform3D),
                rules: {
                    position: {
                        x: rules?.position?.x ?? true,
                        y: rules?.position?.y ?? true,
                        z: rules?.position?.z ?? true
                    },
                    angles: {
                        x: rules?.angles?.x ?? false,
                        y: rules?.angles?.y ?? false,
                        z: rules?.angles?.z ?? false
                    }
                }
            };
        }
        catch (e) {
            throw new AuraError({
                class: 'Camera3D',
                method: 'attachTo',
                message: `Failed to attach to entity with tag ${entity.tag} : the Entity lacks a Transform3D`
            })
        }
    }

    public moveForward(amount: number): void {
        this.transform.moveForward(amount);
    }

    public moveRight(amount: number): void {
        this.transform.moveRight(amount);
    }

    public moveUp(amount: number): void {
        this.transform.moveUp(amount);
    }

    public rotateX(angle: number): void {
        this.transform.rotateX(angle);
    }

    public rotateY(angle: number): void {
        this.transform.rotateY(angle);
    }

    public rotateZ(angle: number): void {
        this.transform.rotateZ(angle);
    }

    public rotate(angles: Vec3): void {
        this.transform.rotate(angles);
    }

    public zoom(factor: Vec3): void {
        this.transform.scaleBy(factor);
    }

    public zoomTo(factor: Vec3): void {
        this.transform.scaleTo(factor);
    }

    public reset(): void {
        this.transform.reset();
    }

    public getViewMatrix(): Mat4 {
        let view: Mat4;

        if (this.following) {
            const { transform } = this.following;

            view = Mat4.scale(transform.compute(), Vec3.invert(transform.scale));

            view = Mat4.translate(view, Vec3.add(this.transform.position, this.transform.offsetPosition));

            view = Mat4.rotateX(view, this.transform.angles.x);
            view = Mat4.rotateY(view, this.transform.angles.y);
            view = Mat4.rotateZ(view, this.transform.angles.z);
        }
        else {
            view = this.transform.compute();
        }

        return Mat4.invert(view) ?? view;
    }
}
