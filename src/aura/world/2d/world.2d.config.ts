import { Camera2DConfig } from '../../camera/2d/camera.2d.config';
import { EntityManagerConfig } from '../../entity/entity.manager.config';
import { Vec2 } from '../../math/vec2';

/**
 * Interface describing a World2D Configuration object
 */
export interface World2DConfig extends EntityManagerConfig {
    /** 2D world dimensions */
    dimensions: Vec2;
    camera: Omit<Camera2DConfig, 'name'>;
}
