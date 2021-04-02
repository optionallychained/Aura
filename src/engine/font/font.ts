import { EntityManager } from '../entity';
import { Color, Vec2, Vec3 } from '../math';
import { Font2DConfig } from './2d';
import { Font3DConfig } from './3d';

/**
 * Abstract Font, an EntityManager which sets out the fundamental properties and runtime behavior of Font object management, and broken
 *   down into concrete 2D and 3D variants for use in Game2D and Game3D respectively
 *
 * Implements Font-specific utilities like String management
 *
 * @typeparam TConfig the specific configuration object type, allowing for the type-correct configuration of the Font Manager
 *
 * // TODO continue on branch text
 */
export abstract class Font<TConfig extends Font2DConfig | Font3DConfig> extends EntityManager<TConfig> {

    /**
     * Constructor. Take the type-correct Fontr Config and pass it up to the parent class
     *
     * @param config the type-correct Font Config
     */
    constructor(config: TConfig) {
        super({
            name: 'font',
            ...config
        });
    }

    /**
     * Abstract String addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D Strings
     *
     * @param the text to render
     * @param position the Vec2 or Vec3 position; the type will be narrowed by the subclass
     * @param scale the Vec2 or Vec3 scale; the type will be narrowed by the subclass
     * @param color the Color of the text
     */
    public abstract addString(text: string, position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
