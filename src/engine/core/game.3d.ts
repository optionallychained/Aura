import { Vec3 } from '../math';
import { World3D } from '../world/world.3d';
import { GameConfig3D } from './game.config';
import { Game } from './game';
import { State3D } from '../state/state.3d';
import { System3D } from '../system/3d';

export class Game3D extends Game {

    public readonly world: World3D;

    protected readonly states = new Map<string, State3D>();
    protected currentState: State3D | undefined;

    protected readonly systems = new Map<string, System3D>();

    constructor(config?: GameConfig3D) {
        super(config);

        this.world = new World3D({
            renderer: this.renderer,
            dimensions: config?.world?.dimensions ?? new Vec3(this.canvas.width, this.canvas.height, 100),
            textureAtlas: config?.world?.textureAtlas,
            cameraOffsets: config?.world?.cameraOffsets
        });

        this.renderer.setRenderingMode('3D');
    }

    public addState(state: State3D): void {
        this.states.set(state.name, state);
    }

    public addStates(...states: Array<State3D>): void {
        for (const state of states) {
            this.addState(state);
        }
    }

    public initState(): void {
        // TODO because typesafety on game param
        this.currentState?.init(this);
    }

    public endState(): void {
        // TODO because typesafety on game param
        this.currentState?.end(this);
    }

    public addSystem(system: System3D): void {
        this.systems.set(system.name, system);
    }

    public addSystems(...systems: Array<System3D>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    protected update(): void {
        // TODO relevant because Systems will be split 2D/3D and want typesafety on game param
        this.systems.forEach((s) => {
            s.tick(this, this.frameDelta);
        });

        this.currentState?.tick(this, this.frameDelta);
    }
}
