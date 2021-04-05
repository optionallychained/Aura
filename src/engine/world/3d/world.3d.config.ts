import { Camera3DConfig } from '../../camera/3d';
import { EntityManagerConfig } from '../../entity';
import { Vec3 } from '../../math';

/**
 * Interface describing a World3D Configuration object
 */
export interface World3DConfig extends EntityManagerConfig {
    /** 3D world dimensions */
    dimensions: Vec3;
    camera?: Partial<Camera3DConfig>;
}
