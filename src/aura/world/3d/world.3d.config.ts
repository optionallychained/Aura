import { Camera3DConfig } from '../../camera/3d/camera.3d.config';
import { EntityManagerConfig } from '../../entity/entity.manager.config';
import { Vec3 } from '../../math/vec3';

/**
 * Interface describing a World3D Configuration object
 */
export interface World3DConfig extends EntityManagerConfig {
    /** 3D world dimensions */
    dimensions: Vec3;
    camera: Omit<Camera3DConfig, 'name'>;
}
