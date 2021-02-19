import { Mat4, Vec3 } from '../../math';
import { Component } from '../component';

export class Transform3D extends Component {

    private scaleVector: Vec3;

    private translationVector: Vec3;

    private rotation: Vec3;

    constructor(
        public readonly initialPosition = new Vec3(),
        public readonly initialScale = new Vec3(1, 1, 1),
        public readonly initialRotation = new Vec3(),
        public readonly velocity = new Vec3()
    ) {

        super('Transform3D');

        this.translationVector = initialPosition;
        this.scaleVector = initialScale;
        this.rotation = initialRotation;
    }

    public translate(translate: Vec3): void {
        this.translationVector = Vec3.add(this.translationVector, translate);
    }

    public rotate(factor: Vec3): void {
        this.rotation = Vec3.add(this.rotation, factor);
    }

    public scale(factor: Vec3): void {
        this.scaleVector = Vec3.mult(this.initialScale, factor);
    }

    public compute(): Mat4 {
        const trans = Mat4.translate(new Mat4(), this.translationVector);

        const rotX = Mat4.rotateX(new Mat4(), this.rotation.x);
        const rotY = Mat4.rotateY(new Mat4(), this.rotation.y);
        const rotZ = Mat4.rotateZ(new Mat4(), this.rotation.z);

        let rot = Mat4.mult(new Mat4(), rotX);
        rot = Mat4.mult(rot, rotY);
        rot = Mat4.mult(rot, rotZ);

        const scale = Mat4.scale(new Mat4(), this.scaleVector);

        let compute = Mat4.mult(new Mat4(), scale);
        compute = Mat4.mult(compute, rot);
        compute = Mat4.mult(compute, trans);

        return compute;
    }
}
