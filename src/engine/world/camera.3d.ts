import { Transform3D } from '../component/3d';
import { Entity } from '../entity';

export class Camera3D extends Entity {

    public static readonly TAG = 'camera3D';

    constructor() {
        super({
            tag: Camera3D.TAG,
            components: [
                new Transform3D()
            ]
        });
    }
}
