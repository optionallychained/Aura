import { EntityManager } from '../entity';
import { Color, Vec2, Vec3 } from '../math';
import { UI2DConfig } from './2d';
import { UI3DConfig } from './3d';

/**
 * Abstract UI, an EntityManager which sets out the fundamental properties and runtime behavior of UI object management, and broken
 *   down into concrete 2D and 3D variants for use in Game2D and Game3D respectively
 *
 * Implements UI-specific utilities like Panel management
 *
 * @typeparam TConfig the specific configuration object type, allowing for the type-correct configuration of the UI Manager
 */
export abstract class UI<TConfig extends UI2DConfig | UI3DConfig> extends EntityManager<TConfig> {

    /**
     * Constructor. Take the type-correct UI Config and pass it up to the parent class
     *
     * @param config the type-correct UI Config
     */
    constructor(config: TConfig) {
        super({
            name: 'ui',
            ...config
        });
    }

    /**
     * Abstract panel addition routine, to be implemented by the subclass
     *
     * By not implementing generically, ensures for example that a Game2D may only be configured with 2D UI elements
     *
     * @param position the Vec2 or Vec3 position; the type will be narrowed by the subclass
     * @param scale the Vec2 or Vec3 scale; the type will be narrowed by the subclass
     * @param color the Color of the panel
     */
    public abstract addPanel(position: Vec2 | Vec3, scale: Vec2 | Vec3, color: Color): void;
}
