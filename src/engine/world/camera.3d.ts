import { Transform3D } from '../component/3d';
import { ProtoGLError } from '../core';
import { Entity } from '../entity';
import { Angle, Mat4, Vec3 } from '../math';

interface FollowRules {
    position?: { x?: boolean; y?: boolean; z?: boolean };
    angle?: { x?: boolean; y?: boolean; z?: boolean };
}

// TODO this is a free camera
//   TODO reclassify as such
//   TODO add roll

// TODO play with the idea of using a lookAt Matrix natively and utilising its forward,up,right vectors
export class Camera3D {

    private position: Vec3;
    private forward: Vec3;
    private up: Vec3;

    private following: {
        transform: Transform3D;
        rules: DeepRequired<FollowRules>;
    } | undefined;

    constructor(positionOffset = new Vec3(), scaleOffset = new Vec3(1, 1, 1), angleOffset = new Vec3()) {
        this.position = positionOffset;

        this.forward = new Vec3(0, 0, -1);
        this.up = new Vec3(0, 1, 0);
    }

    public attachTo(entity: Entity, rules?: FollowRules): void {
        try {
            this.following = {
                transform: entity.getComponent(Transform3D),
                rules: {
                    position: {
                        x: rules?.position?.x ?? true,
                        y: rules?.position?.y ?? true,
                        z: rules?.position?.z ?? true
                    },
                    angle: {
                        x: rules?.angle?.x ?? false,
                        y: rules?.angle?.y ?? false,
                        z: rules?.angle?.z ?? false
                    }
                }
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
        this.position = Vec3.add(this.position, Vec3.scale(this.forward, amount));
    }

    public moveRight(amount: number): void {
        const right = Vec3.normalize(Vec3.cross(this.forward, this.up));

        this.position = Vec3.add(this.position, Vec3.scale(right, amount));
    }

    public moveUp(amount: number): void {
        this.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    public rotateX(angle: number): void {
        const right = Vec3.normalize(Vec3.cross(this.forward, this.up));

        const mat = Mat4.fromAxisRotation(right, angle);

        this.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
        this.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    public rotateY(angle: number): void {
        const mat = Mat4.fromAxisRotation(this.up, angle);

        this.forward = Vec3.normalize(Vec3.transformByMat4(this.forward, mat));
    }

    public rotateZ(angle: number): void {
        const mat = Mat4.fromAxisRotation(this.forward, angle);

        this.up = Vec3.normalize(Vec3.transformByMat4(this.up, mat));
    }

    public zoom(factor: Vec3): void {
        // this.transform.scaleBy(factor);
    }

    public zoomTo(factor: Vec3): void {
    }

    public reset(): void {
    }

    public getViewMatrix(): Mat4 {
        const transform = Mat4.lookAt(this.position, Vec3.add(this.position, this.forward), this.up);

        return Mat4.invert(transform) ?? transform;
    }

    // private actualPosition(): Vec3 {
    //     let position = this.position;

    //     if (this.following) {
    //         const { transform, rules } = this.following;

    //         const addition = new Vec3(
    //             rules.position.x ? transform.position.x : 0,
    //             rules.position.y ? transform.position.y : 0,
    //             rules.position.z ? transform.position.z : 0,
    //         );

    //         position = Vec3.add(position, addition);
    //     }

    //     return position;
    // }

    // private actualAngles(): Vec3 {
    //     let angles = new Vec3(this.pitch, this.yaw, this.roll);

    //     if (this.following) {
    //         const { transform, rules } = this.following;

    //         const addition = new Vec3(
    //             rules.angle.x ? transform.angles.x : 0,
    //             rules.angle.y ? transform.angles.y : 0,
    //             rules.angle.z ? transform.angles.z : 0
    //         );

    //         angles = Vec3.add(angles, addition);
    //     }

    //     return angles;
    // }
}
