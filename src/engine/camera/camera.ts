import { Transform2D } from '../component/2d';
import { Transform3D } from '../component/3d';
import { Entity } from '../entity';
import { Mat3, Mat4, Vec2, Vec3 } from '../math';

interface Follow {
    transform: Transform2D | Transform3D;
}

export abstract class Camera<TVector = Vec2 | Vec3, TMatrix = Mat3 | Mat4> {

    constructor(protected positionOffset: TVector, protected angleOffset: TVector, protected scaleOffset: TVector) { }

    public abstract attachTo<TFollow extends Follow>(entity: Entity, rules: TFollow): void;

    public abstract detach: void;

    // public abstract moveForward(amount: number): void;

    public abstract moveRight(amount: number): void;

    public abstract moveUp(amount: number): void;

    public abstract offset(translate: TVector): void;

    public abstract rotate(angles: TVector): void;

    public abstract zoom(factor: TVector): void;

    public abstract zoomTo(factor: TVector): void;

    public abstract reset(): void;

    public abstract getViewMatrix(): TMatrix;
}
