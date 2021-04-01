import { Vec2 } from '../math';
import { World2D } from '../world/world.2d';
import { GameConfig2D } from './game.config';
import { Game } from './game';
import { State2D } from '../state/state.2d';
import { AuraError } from './aura.error';
import { World3D } from '../world/world.3d';
import { Font } from '../text';
import { UI } from '../ui';
import { InputManager } from '../input';

export class Game2D extends Game {

    public readonly world: World2D;

    protected readonly states = new Map<string, State2D>();
    protected currentState: State2D | undefined;

    constructor(config?: GameConfig2D) {
        super(config);

        this.world = new World2D({
            game: this,
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
}
