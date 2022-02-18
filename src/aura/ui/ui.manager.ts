import { EntityManager } from '../entity/entity.manager';
import { Color } from '../math/color';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';
import { UIConfig as UIConfig2D } from './2d/ui.config';
import { UIConfig as UIConfig3D } from './3d/ui.config';

/**
 * Abstract UIManager; an EntityManager implementing core functionality for Aura's UI
 *
 * Broken down into concrete 2D and 3D variants, providing domain-specific behavior and type safety for Aura2D and Aura3D Games respectively
 *
 * @typeparam Config the specific 2D or 3D UI configuration object type
 */
export abstract class UIManager<Config extends UIConfig2D | UIConfig3D> extends EntityManager<Config> {

    /**
     * Constructor. Pass a type-correct 2D or 3D UIConfig to the parent class
     *
     * @param config the type-correct 2D or 3D UIConfig
     */
    constructor(config: Config) {
        super({
            name: 'ui',
            ...config
        });
    }

    /**
     * Abstract 2D or 3D Panel addition; to be implemented and type narrowed by the subclass
     *
     * @param position the 2D or 3D position of the Panel
     * @param scale the 2D or 3D scale of the Panel
     * @param color the Color of the Panel
     */
    public abstract addPanel(position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
