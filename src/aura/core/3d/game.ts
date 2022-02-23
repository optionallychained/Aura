import { Text } from '../../text/3d/text';
import { Vec3 } from '../../math/vec3';
import { State } from '../../state/3d/state';
import { System } from '../../system/3d/system';
import { UI } from '../../ui/3d/ui';
import { World } from '../../world/3d/world';
import { GameBase } from '../game.base';
import { GameConfig } from './game.config';

/**
 * Concrete 3D Game, setting out the 3D-specific properties and behavior for the operation of 3D Games
 */
export class Game extends GameBase {

    /** Concrete 3D World */
    public readonly world: World;

    /** Concrete 3D Font */
    public readonly text: Text;

    /** Concrete 3D UI */
    public readonly ui: UI;

    /** Concrete mapping of 3D States */
    protected readonly states = new Map<string, State>();

    /** Concrete reference to the current 3D State */
    protected currentState: State | undefined;

    /** Concrete mapping of 3D Systems */
    protected readonly systems = new Map<string, System>();

    /**
     * Constructor. Pass an optional 3D GameConfig to the parent class and initialise all 3D-specific aspects of the Game
     *
     * @param config the optional 3D GameConfig
     */
    constructor(config?: GameConfig) {
        super(config);

        // initialise a 3D Text
        this.text = new Text({
            renderer: this.renderer,
            charset: config?.text?.charset ?? this.defaults.textCharset,
            textureAtlas: config?.text?.textureAtlas ?? this.defaults.textAtlas
        });

        // initialise a 3D UI
        this.ui = new UI({
            renderer: this.renderer,
            textureAtlas: config?.ui?.textureAtlas
        });

        // initialsie a 3D World
        this.world = new World({
            renderer: this.renderer,
            // TODO instance of destroy() being annoying; canvas optional
            dimensions: config?.world?.dimensions ?? new Vec3(this.canvas?.width, this.canvas?.height, 1000),
            textureAtlas: config?.world?.textureAtlas,
            camera: {
                offset: config?.world?.camera?.offset,
                projection: config?.world?.camera?.projection ?? {
                    mode: 'perspective',
                    fov: 90,
                    near: 0.1,
                    far: 1000000,
                    width: this.canvas!.width,
                    height: this.canvas!.height
                }
            }
        });

        // configure the Renderer
        this.renderer.setRenderingMode('3D');
    }

    /**
     * Add a single 3D State to the Game
     *
     * @param state the 3D State to add
     */
    public addState(state: State): void {
        this.states.set(state.name, state);
    }

    /**
     * Add a list of 3D States to the Game
     *
     * @param state the list of 3D States to add
     */
    public addStates(...states: Array<State>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Add a single 3D System to the Game
     *
     * @param system the 3D System to add
     */
    public addSystem(system: System): void {
        this.systems.set(system.name, system);
    }

    /**
     * Add a list of 3D States to the Game
     *
     * @param systems the list of 3D Systems to add
     */
    public addSystems(...systems: Array<System>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Concrete 3D State initialization routine, passing the type-correct 3D Game to the State's lifecycle method
     */
    protected initState(): void {
        this.currentState?.init(this);
    }

    /**
     * Concrete 3D State end routine, passing the type-correct 3D Game to the State's lifecycle method
     */
    protected endState(): void {
        this.currentState?.end(this);
    }

    /**
     * Concrete frame update routine, passing the type-correct 3D Game to the State's lifecycle method
     *
     * Just updates all 3D Systems and the current 3D State
     */
    protected update(): void {
        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        this.currentState?.tick(this, this.frameDelta);
    }
}
