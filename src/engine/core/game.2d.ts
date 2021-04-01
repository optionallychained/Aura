import { Vec2 } from '../math';
import { World2D } from '../world/world.2d';
import { GameConfig2D } from './game.config';
import { Game } from './game';
import { State2D } from '../state/state.2d';
import { System2D } from '../system/2d';
import { Font2D } from '../text/2d';

export class Game2D extends Game {

    public readonly world: World2D;

    public readonly font: Font2D;

    protected readonly states = new Map<string, State2D>();
    protected currentState: State2D | undefined;

    protected readonly systems = new Map<string, System2D>();

    constructor(config?: GameConfig2D) {
        super(config);

        this.font = new Font2D({
            renderer: this.renderer,
            charset: config?.font?.charset ?? this.defaults.fontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaults.fontAtlas
        });

        this.world = new World2D({
            renderer: this.renderer,
            dimensions: config?.world?.dimensions ?? new Vec2(this.canvas.width, this.canvas.height),
            textureAtlas: config?.world?.textureAtlas,
            cameraOffsets: config?.world?.cameraOffsets
        });

        this.renderer.setRenderingMode('2D');
    }

    public addState(state: State2D): void {
        this.states.set(state.name, state);
    }

    public addStates(...states: Array<State2D>): void {
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

    public addSystem(system: System2D): void {
        this.systems.set(system.name, system);
    }

    public addSystems(...systems: Array<System2D>): void {
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
