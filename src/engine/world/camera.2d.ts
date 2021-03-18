import { Transform2D } from '../component/2d';
import { ProtoGLError } from '../core';
import { Entity } from '../entity';
import { Mat3, Vec2 } from '../math';

interface FollowRules {
    position?: { x?: boolean; y?: boolean; };
    angle?: boolean;
}

// TODO limit camera movement to world boundaries?
// TODO (after transform parenting work) redefinable as an Entity?
export class Camera2D {

    private transform: Transform2D;

    private following: {
        transform: Transform2D;
        rules: DeepRequired<FollowRules>;
    } | undefined;

    constructor(positionOffset = new Vec2(), scaleOffset = new Vec2(1, 1), angleOffset = 0) {
        this.transform = new Transform2D(positionOffset, scaleOffset, angleOffset);
    }

    public attachTo(entity: Entity, rules?: FollowRules): void {
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
            // re-throw the Component not found error for specificity
            throw new ProtoGLError({
                class: 'Camera2D',
                method: 'follow',
                message: `Failed to follow Entity with tag '${entity.tag}' : the Entity lacks a Transform2D`
            });
        }
    }

    public detach(): void {
        this.following = undefined;
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
        // TODO will maybe become obsolete with Transform parenting
        //   ...this may actually serve as a good basis for Transform parenting?

        let transform: Mat3;

        if (this.following) {
            transform = Mat3.translate(new Mat3(), this.actualPosition());
            transform = Mat3.rotate(transform, this.actualAngle());
            transform = Mat3.scale(transform, this.transform.scale);
        }
        else {
            // if we're not following we can just fall back to the Transform2D's own compute()
            transform = this.transform.compute();
        }

        return Mat3.invert(transform) ?? transform;
    }

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

    private actualAngle(): number {
        let { angle } = this.transform;

        if (this.following) {
            angle += this.following.transform.angle * (this.following.rules.angle ? 1 : 0);
        }

        return angle;
    }
}
