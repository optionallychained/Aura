import { Transform3D } from '../component/3d';
import { ProtoGLError } from '../core';
import { Entity } from '../entity';
import { Angle, Mat4, Vec3 } from '../math';

export class Camera3D {

    private transform: Transform3D;

    private following: {
        transform: Transform3D;
    } | undefined;

    constructor(positionOffset = new Vec3(), angleOffsets = new Vec3()) {
        this.transform = new Transform3D(positionOffset, new Vec3(1, 1, 1), angleOffsets);
    }

    public attachTo(entity: Entity): void {
        try {
            this.following = {
                transform: entity.getComponent(Transform3D)
            };
        }
        catch (e) {
            throw new ProtoGLError({
                class: 'Camera3D',
                method: 'attachTo',
                message: `Failed to attach to entity with tag '${entity.tag}'`
            });
        }
    }

    public detach(): void {
        this.following = undefined;
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

    public offset(translate: Vec3): void {
        this.transform.offset(translate);
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
    }

    public zoomTo(factor: Vec3): void {
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

            // TODO rotates around self...not really what we want?
            // might need an entirely different type of camera or view matrix calculation to rotate around player
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
