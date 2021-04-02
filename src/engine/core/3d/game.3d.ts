import { Font3D } from '../../font/3d';
import { Vec3 } from '../../math';
import { State3D } from '../../state/3d';
import { System3D } from '../../system/3d';
import { UI3D } from '../../ui/3d';
import { World3D } from '../../world/3d';
import { Game } from '../game';
import { Game3DConfig } from './game.3d.config';

/**
 * Concrete Game3D object, setting out the 3D-specific properties and runtime behaviour of 3D Aura Games
 *
 * Implements and type-narrows the abstract elements of the parent class Game so as to produce consumer type-safety on things like
 *   Game structure management and State lifecycle methods
 */
export class Game3D extends Game {

    /** Concrete 3D World */
    public readonly world: World3D;

    /** Concrete 3D Font */
    public readonly font: Font3D;

    /** Concrete 3D UI */
    public readonly ui: UI3D;

    /** Concrete mapping of 3D States */
    protected readonly states = new Map<string, State3D>();

    /** Concrete reference to the current 3D State */
    protected currentState: State3D | undefined;

    /** Concrete mapping of 3D Systems */
    protected readonly systems = new Map<string, System3D>();

    /**
     * Constructor. Take an optional GameConfig3D, pass it up to the parent class, and then initialise all 3D-specific aspects of the Game
     *
     * @param config the optional GameConfig3D
     */
    constructor(config?: Game3DConfig) {
        super(config);

        // initialise a Font3D
        this.font = new Font3D({
            renderer: this.renderer,
            charset: config?.font?.charset ?? this.defaults.fontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaults.fontAtlas
        });

        // initialise a UI3D
        this.ui = new UI3D({
            renderer: this.renderer,
            textureAtlas: config?.ui?.textureAtlas
        });

        // initialsie a World3D
        this.world = new World3D({
            renderer: this.renderer,
            dimensions: config?.world?.dimensions ?? new Vec3(this.canvas.width, this.canvas.height, 1000),
            textureAtlas: config?.world?.textureAtlas,
            cameraOffsets: config?.world?.cameraOffsets
        });

        // configure the Renderer
        this.renderer.setRenderingMode('3D');
    }

    /**
     * Concrete single State3D addition routine, narrowing the generic type to ensure the correct configuration of a Game3D
     *
     * @param state the State3D to add
     */
    public addState(state: State3D): void {
        this.states.set(state.name, state);
    }

    /**
     * Concrete multi State3D addition routine, narrowing the generic type to ensure the correct configuration of a Game3D
     *
     * @param states the list of State3Ds to add
     */
    public addStates(...states: Array<State3D>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    /**
     * Concrete State init routine, ensuring that the State3D lifecycle method init() receives the type-correct Game3D
     */
    public initState(): void {
        this.currentState?.init(this);
    }

    /**
     * Concrete State end routine, ensuring that the State3D lifecycle method end() receives the type-correct Game3D
     */
    public endState(): void {
        this.currentState?.end(this);
    }

    /**
     * Concrete single System3D adition routine, narrowing the generic type to ensure the correct configuration of a Game3D
     *
     * @param system the System3D to add
     */
    public addSystem(system: System3D): void {
        this.systems.set(system.name, system);
    }

    /**
     * Concrete multi System3D addition routine, narrowing the generic type to ensure the correct configuration of a Game3D
     *
     * @param systems the list of System3Ds to add
     */
    public addSystems(...systems: Array<System3D>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    /**
     * Concrete frame update routine, ensuring that the System3D and State3D tick() lifecycle methods receive the type-correct Game3D
     *
     * Just updates all System3Ds and the current State3D
     */
    protected update(): void {
        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        this.currentState?.tick(this, this.frameDelta);
    }
}
