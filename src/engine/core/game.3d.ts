import { Vec3 } from '../math';
import { World3D } from '../world/world.3d';
import { GameConfig3D } from './game.config';
import { Game } from './game';
import { State3D } from '../state/state.3d';
import { AuraError } from './aura.error';

export class Game3D extends Game<GameConfig3D> {

    public readonly world: World3D;

    protected readonly states = new Map<string, State3D>();
    protected currentState: State3D | undefined;

    constructor(config?: GameConfig3D) {
        super(config);

        this.world = new World3D({
            game: this,
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
}
