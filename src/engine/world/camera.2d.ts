import { Transform2D } from '../component/2d';
import { Entity } from '../entity';

export class Camera2D extends Entity {

    public static readonly TAG = 'camera_2d';

    constructor() {
        super({
            tag: Camera2D.TAG,
            components: [
                new Transform2D()
            ]
        });
    }
}
