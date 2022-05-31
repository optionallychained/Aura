import { Text } from '../../text/2d/text';
import { Vec2 } from '../../math/vec2';
import { State } from '../../state/2d/state';
import { System } from '../../system/2d/system';
import { UI } from '../../ui/2d/ui';
import { World } from '../../world/2d/world';
import { GameBase } from '../game.base';
import { GameConfig } from './game.config';
import { PROGRAM_BASIC } from '../../shader/program/2d/basic.program';
import { PROGRAM_COLOR_PER_VERTEX } from '../../shader/program/2d/colorPerVertex.program';
import { PROGRAM_TEXTURE } from '../../shader/program/2d/texture.program';
import { PROGRAM_TEXTURE_COLORED } from '../../shader/program/2d/textureColored.program';

/**
 * Concrete 2D Game, setting out the 2D-specific properties and behavior for the operation of 2D Games
 */
export class Game extends GameBase {

    /** Concrete 2D World */
    public readonly world: World;

    /** Concrete 2D Text */
    public readonly text: Text;

    /** Concrete 2D UI */
    public readonly ui: UI;

    /** Concrete mapping of 2D States */
    protected readonly states = new Map<string, State>();

    /** Concrete reference to the current 2D State */
    protected currentState: State | undefined;

    /** Concrete mapping of 2D Systems */
    protected readonly systems = new Map<string, System>();

    /** Concrete list of default shaders */
    protected readonly defaultShaders = [
        PROGRAM_BASIC,
        PROGRAM_COLOR_PER_VERTEX,
        PROGRAM_TEXTURE,
        PROGRAM_TEXTURE_COLORED
    ];

    /**
     * Constructor. Pass an optional 2D GameConfig to the parent class and initialise all 2D-specific aspects of the Game
     *
     * @param config the optional 2D GameConfig
     */
    constructor(config?: GameConfig) {
        super(config);

        // initialsie a 2D Text
        this.text = new Text({
            renderer: this.renderer,
            charset: config?.text?.charset ?? this.defaults.textCharset,
            textureAtlas: config?.text?.textureAtlas ?? this.defaults.textAtlas
        });

        // initialise a 2D UI
        this.ui = new UI({
            renderer: this.renderer,
            textureAtlas: config?.ui?.textureAtlas
        });

        // initialise a 2D World
        this.world = new World({
            renderer: this.renderer,
            // TODO instance of destroy() being annoying; canvas optional
            dimensions: config?.world?.dimensions ?? new Vec2(this.canvas?.width, this.canvas?.height),
            textureAtlas: config?.world?.textureAtlas,
            camera: {
                offset: config?.world?.camera?.offset,
                projection: config?.world?.camera?.projection ?? {
                    width: this.canvas!.width,
                    height: this.canvas!.height
                }
            }
        });

        // initialise states
        if (config?.states) {
            this.addStates(...config.states);
        }

        // configure the Renderer
        this.renderer.setRenderingMode('2D');
    }

    /**
     * Add a single 2D State to the Game
     *
     * @param state the 2D State to add
     */
    public addState(state: State): void {
        this.states.set(state.name, state);
    }

    /**
     * Add a list of 2D States to the Game
     *
     * @param state the list of 2D States to add
     */
    public addStates(...states: Array<State>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Add a single 2D System to the Game
     *
     * @param system the 2D System to add
     */
    public addSystem(system: System): void {
        this.systems.set(system.name, system);
    }

    /**
     * Add a list of 2D States to the Game
     *
     * @param systems the list of 2D Systems to add
     */
    public addSystems(...systems: Array<System>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Concrete 2D State initialization routine, passing the type-correct 2D Game to the State's lifecycle method
     */
    protected initState(): void {
        this.currentState?.init(this);
    }

    /**
     * Concrete 2D State end routine, passing the type-correct 2D Game to the State's lifecycle method
     */
    protected endState(): void {
        this.currentState?.end(this);
    }

    /**
     * Concrete frame update routine, passing the type-correct 2D Game to the State's lifecycle method
     *
     * Just updates all 2D Systems and the current 2D State
     */
    protected update(): void {
        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        this.currentState?.tick(this, this.frameDelta);
    }
}
