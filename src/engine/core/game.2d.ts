import { Vec2 } from '../math';
import { World2D } from '../world/2d/world.2d';
import { GameConfig2D } from './game.config';
import { Game } from './game';
import { State2D } from '../state/state.2d';
import { System2D } from '../system/2d';
import { Font2D } from '../text/2d';
import { UI2D } from '../ui/2d';

/**
 * Concrete Game2D object, setting out the 2D-specific properties and runtime behaviour of 2D Aura Games
 *
 * Implements and type-narrows the abstract elements of the parent class Game so as to produce consumer type-safety on things like
 *   Game structure management and State lifecycle methods
 */
export class Game2D extends Game {

    /** Concrete 2D World */
    public readonly world: World2D;

    /** Concrete 2D Font */
    public readonly font: Font2D;

    /** Concrete 2D UI */
    public readonly ui: UI2D;

    /** Concrete mapping of 2D States */
    protected readonly states = new Map<string, State2D>();

    /** Concrete reference to the current 2D State */
    protected currentState: State2D | undefined;

    /** Concrete mapping of 2D Systems */
    protected readonly systems = new Map<string, System2D>();

    /**
     * Constructor. Take an optional GameConfig2D, pass it up to the parent class, and then initialise all 2D-specific aspects of the Game
     *
     * @param config the optional GameConfig2D
     */
    constructor(config?: GameConfig2D) {
        super(config);

        // initialsie a Font2D
        this.font = new Font2D({
            renderer: this.renderer,
            charset: config?.font?.charset ?? this.defaults.fontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaults.fontAtlas
        });

        // initialise a UI2D
        this.ui = new UI2D({
            renderer: this.renderer,
            textureAtlas: config?.ui?.textureAtlas
        });

        // initialise a World2D
        this.world = new World2D({
            renderer: this.renderer,
            dimensions: config?.world?.dimensions ?? new Vec2(this.canvas.width, this.canvas.height),
            textureAtlas: config?.world?.textureAtlas,
            cameraOffsets: config?.world?.cameraOffsets
        });

        // configure the Renderer
        this.renderer.setRenderingMode('2D');
    }

    /**
     * Concrete single State2D addition routine, narrowing the generic type to ensure the correct configuration of a Game2D
     *
     * @param state the State2D to add
     */
    public addState(state: State2D): void {
        this.states.set(state.name, state);
    }

    /**
     * Concrete multi State2D addition routine, narrowing the generic type to ensure the correct configuration of a Game2D
     *
     * @param states the list of State2Ds to add
     */
    public addStates(...states: Array<State2D>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Concrete State init routine, ensuring that the State2D lifecycle method init() receives the type-correct Game2D
     */
    public initState(): void {
        this.currentState?.init(this);
    }

    /**
     * Concrete State end routine, ensuring that the State2D lifecycle method end() receives the type-correct Game2D
     */
    public endState(): void {
        this.currentState?.end(this);
    }

    /**
     * Concrete single System2D adition routine, narrowing the generic type to ensure the correct configuration of a Game2D
     *
     * @param system the System2D to add
     */
    public addSystem(system: System2D): void {
        this.systems.set(system.name, system);
    }

    /**
     * Concrete multi System2D addition routine, narrowing the generic type to ensure the correct configuration of a Game2D
     *
     * @param systems the list of System2Ds to add
     */
    public addSystems(...systems: Array<System2D>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Concrete frame update routine, ensuring that the System2D and State2D tick() lifecycle methods receive the type-correct Game2D
     *
     * Just updates all System2Ds and the current State2D
     */
    protected update(): void {
        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        this.currentState?.tick(this, this.frameDelta);
    }
}
