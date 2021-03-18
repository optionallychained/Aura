import { Transform3D } from '../component/3d';
import { Angle, Mat4, Vec3 } from '../math';

// interface FollowRules {
//     position?: { x?: boolean; y?: boolean; z?: boolean };
//     angle?: { x?: boolean; y?: boolean; z?: boolean };
// }

// TODO this is a free camera
//   TODO reclassify as such
//   TODO add roll

// TODO play with the idea of using a lookAt Matrix natively and utilising its forward,up,right vectors
export class Camera3D {

    private position: Vec3;
    private front: Vec3;
    private right: Vec3;
    private up: Vec3;

    private yaw = 0;
    private pitch = 0;
    private roll = 0;

    // private following: {
    //     transform: Transform3D;
    //     rules: DeepRequired<FollowRules>;
    // } | undefined;

    constructor(positionOffset = new Vec3(), scaleOffset = new Vec3(1, 1, 1), angleOffset = new Vec3()) {
        this.position = positionOffset;
        this.front = new Vec3(0, 0, -1);
        this.right = new Vec3(1, 0, 0);
        this.up = new Vec3(0, 1, 0);
    }

    // public attachTo(entity: Entity, rules?: FollowRules): void {
    //     try {
    //         this.following = {
    //             transform: entity.getComponent(Transform3D),
    //             rules: {
    //                 position: {
    //                     x: rules?.position?.x ?? true,
    //                     y: rules?.position?.y ?? true,
    //                     z: rules?.position?.z ?? true
    //                 },
    //                 angle: {
    //                     x: rules?.angle?.x ?? false,
    //                     y: rules?.angle?.y ?? false,
    //                     z: rules?.angle?.z ?? false,
    //                 }
    //             }
    //         };
    //     }
    //     catch (e) {
    //         throw new ProtoGLError({
    //             class: 'Camera3D',
    //             method: 'follow',
    //             message: `Failed to follow Entity with tag '${entity.tag}' : the Entity lacks a Transform3D`
    //         });
    //     }
    // }

    // public detach(): void {
    //     this.following = undefined;
    // }

    public moveForward(amount: number): void {
        this.position = Vec3.add(this.position, Vec3.scale(this.front, amount));
    }

    public moveRight(amount: number): void {
        this.position = Vec3.add(this.position, Vec3.scale(this.right, amount));
    }

    public moveUp(amount: number): void {
        this.position = Vec3.add(this.position, Vec3.scale(this.up, amount));
    }

    public rotate(angles: Vec3): void {
        this.pitch += angles.x;
        this.yaw += angles.y;
        this.roll += angles.z;

    }

    public zoom(factor: Vec3): void {
        // this.transform.scaleBy(factor);
    }

    public zoomTo(factor: Vec3): void {
    }

    public reset(): void {
    }

    public getViewMatrix(): Mat4 {

        this.front = Vec3.normalize(new Vec3(
            Math.cos(this.yaw - Angle.toRadians(90)) * Math.cos(this.pitch),
            Math.sin(this.pitch),
            Math.sin(this.yaw - Angle.toRadians(90)) * Math.cos(this.pitch)
        ));

        this.right = Vec3.normalize(Vec3.cross(this.front, new Vec3(0, 1, 0)));
        this.up = Vec3.normalize(Vec3.cross(this.right, this.front));

        const transform = Mat4.lookAt(this.position, Vec3.add(this.position, this.front), this.up);


        return Mat4.invert(transform) ?? transform;
    }
}
