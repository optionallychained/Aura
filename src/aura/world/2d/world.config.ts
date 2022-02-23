import { CameraConfig } from '../../camera/2d/camera.config';
import { EntityManagerConfig } from '../../entity/entity.manager.config';
import { Vec2 } from '../../math/vec2';

/**
 * Interface describing a 2D World Configuration object
 */
export interface WorldConfig extends EntityManagerConfig {
    /** 2D world dimensions */
    dimensions: Vec2;
    /** 2D default Camera configuration */
    camera: Omit<CameraConfig, 'name'>;
}
