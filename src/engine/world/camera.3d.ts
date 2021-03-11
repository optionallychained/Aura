import { Transform3D } from '../component/3d';
import { Entity } from '../entity';

export class Camera3D extends Entity {

    public static readonly TAG = 'camera_3d';

    constructor() {
        super({
            tag: Camera3D.TAG,
            components: [
                new Transform3D()
            ]
        });
    }
}
