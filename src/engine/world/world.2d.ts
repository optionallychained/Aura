import { Camera2D } from '../camera';
import { Vec2 } from '../math';
import { World } from './world';
import { WorldConfig2D } from './world.config';

export class World2D extends World<WorldConfig2D> {
    public readonly activeCamera: Camera2D;

    protected readonly cameras = new Map<string, Camera2D>();

    constructor(config: WorldConfig2D) {
        super(config);

        const defaultCamera = new Camera2D(
            config.cameraOffsets?.position,
            config.cameraOffsets?.angle
            // TODO scaleOffset?
        );

        this.cameras.set('default', defaultCamera);
        this.activeCamera = defaultCamera;
    }

    public get dimensions(): Vec2 {
        return this.config.dimensions;
    }
}
