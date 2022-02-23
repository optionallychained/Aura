import { EntityManager } from '../entity/entity.manager';
import { Color } from '../math/color';
import { Vec2 } from '../math/vec2';
import { Vec3 } from '../math/vec3';
import { TextConfig as TextConfig2D } from './2d/text.config';
import { TextConfig as TextConfig3D } from './3d/text.config';

/**
 * Abstract TextManager; an EntityManager implementing core functionality for Aura's Atlas-based Text rendering
 *
 * Broken down into concrete 2D and 3D variants, providing domain-specific behavior and type safety for Aura2D and Aura3D Games respectively
 *
 * @typeparam Config the specific 2D or 3D Text configuration object type
 */
export abstract class TextManager<Config extends TextConfig2D | TextConfig3D> extends EntityManager<Config> {

    /**
     * Constructor. Pass a type-correct 2D or 3D TextConfig to the parent class
     *
     * @param config the type-correct 2D or 3D TextConfig
     */
    constructor(config: Config) {
        super({
            name: 'font',
            ...config
        });
    }

    /**
     * Abstract string addition; to be implemented and type narrowed by the subclass
     *
     * @param string the string to add
     * @param position the 2D or 3D position of the string to add
     * @param scale the 2D or 3D scale of the string to add
     * @param color the Color of the string to add
     */
    public abstract addString(string: string, position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
