import { Camera3D } from '../camera';
import { Vec3 } from '../math';
import { World } from './world';
import { WorldConfig3D } from './world.config';

export class World3D extends World<WorldConfig3D> {
    public readonly activeCamera: Camera3D;

    protected readonly cameras = new Map<string, Camera3D>();

    constructor(config: WorldConfig3D) {
        super(config);

        const defaultCamera = new Camera3D(
            config.cameraOffsets?.position,
            config.cameraOffsets?.angles
        );

        this.cameras.set('default', defaultCamera);
        this.activeCamera = defaultCamera;
    }

    public get dimensions(): Vec3 {
        return this.config.dimensions;
    }
}
