import { Transform3D } from '../component/3d';
import { Entity } from '../entity';
import { Vec3 } from '../math';

export class Camera3D extends Entity {

    public static readonly TAG = 'camera3D';

    constructor() {
        super({
            tag: Camera3D.TAG,
            components: [
                new Transform3D(new Vec3(0, 0, -500))
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
