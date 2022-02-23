import { CameraConfig } from '../../camera/3d/camera.config';
import { EntityManagerConfig } from '../../entity/entity.manager.config';
import { Vec3 } from '../../math/vec3';

/**
 * Interface describing a 3D World Configuration object
 */
export interface WorldConfig extends EntityManagerConfig {
    /** 3D world dimensions */
    dimensions: Vec3;
    /** 3D default Camera configuration */
    camera: Omit<CameraConfig, 'name'>;
}
