import { ControlScheme, InputManager } from '../input';
import { Color, Vec2 } from '../math';
import { Renderer } from '../renderer';
import { ShaderProgram } from '../shader/program';
import { State } from '../state';
import { State2D } from '../state/state.2d';
import { State3D } from '../state/state.3d';
import { System } from '../system';
import { Font } from '../text';
import { TextureAtlas } from '../texture';
import { UI } from '../ui';
import { World } from '../world';
import { AuraError } from './aura.error';
import { GameConfig2D, GameConfig3D } from './game.config';

interface ConfigDefaults {
    backgroundColor: Color;
    canvasDimensions: Vec2;
    controlScheme: ControlScheme;
    fontAtlas: TextureAtlas;
    fontCharset: Array<string>;
}

export abstract class Game<TConfig extends GameConfig2D | GameConfig3D = GameConfig2D | GameConfig3D> {
    public abstract readonly world: World;

    public readonly font: Font;
    public readonly ui: UI;
    public readonly input: InputManager;
    public readonly renderer: Renderer;
    public readonly canvas: HTMLCanvasElement;

    protected abstract readonly states: Map<string, State>;
    protected abstract currentState: State | undefined;

    // TODO 2D/3D split for Systems?
    protected readonly systems = new Map<string, System>();

    protected frameDetla = 0;
    protected lastFrameTime = 0;

    protected readonly data = new Map<string, unknown>();

    protected readonly debugData = {
        frameCount: 0,
        fps: ''
    };

    protected readonly defaults: ConfigDefaults = {
        backgroundColor: new Color(),
        canvasDimensions: new Vec2(window.innerWidth, window.innerHeight),
        controlScheme: 'keyboard',
        fontCharset: [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
            'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '[', ']', '+', '-', '*', '/', '!', '?', '\'', '"', '#', '£',
            '$', '&', '%', '^', ',', '.', ':', ';', '<', '>', '_', ' ', '~', '~'
        ],
        fontAtlas: new TextureAtlas('text', 'res/font.png', 64, 1),
    }

    constructor(protected readonly config?: TConfig) {
        if (config?.canvasId) {
            this.canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;

            if (!this.canvas) {
                throw new AuraError({
                    class: 'Game',
                    method: 'construct',
                    message: `Failed to retrieve Canvas with id ${config.canvasId}`
                });
            }
        }
        else {
            this.canvas = document.createElement('canvas');
            document.body.append(this.canvas);
        }

        this.canvas.width = config?.canvasDimensions?.x ?? this.defaults.canvasDimensions.x;
        this.canvas.height = config?.canvasDimensions?.y ?? this.defaults.canvasDimensions.y;

        this.renderer = new Renderer(this, config?.backgroundColor ?? this.defaults.backgroundColor);
        this.input = new InputManager(this, config?.controlScheme ?? this.defaults.controlScheme);

        this.ui = new UI({
            game: this,
            textureAtlas: config?.ui?.textureAtlas
        });

        this.font = new Font({
            game: this,
            charset: config?.font?.charset ?? this.defaults.fontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaults.fontAtlas
        });
    }

    public abstract addState(state: State): void;

    public abstract addStates(...states: Array<State>): void;

    public switchToState(name: string): void {
        this.currentState?.end(this);

        this.currentState = this.states.get(name);

        if (!this.currentState) {
            throw new AuraError({
                class: 'Game',
                method: 'switchToState',
                message: `Failed to switch to State '${name}' : State does not exist`
            });
        }

        this.currentState.init(this);
    }

    public addSystem(system: System): void {
        this.systems.set(system.name, system);
    }

    public addSystems(...systems: Array<System>): void {
        for (const system of systems) {
            this.addSystem(system);
        }
    }

    public removeSystem(name: string): void {
        this.systems.delete(name);
    }

    public removeSystems(...names: Array<string>): void {
        for (const name of names) {
            this.removeSystem(name);
        }
    }

    public setData<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    public getData<T>(key: string): T {
        const data = this.data.get(key);

        if (!data) {
            throw new AuraError({
                class: 'Game',
                method: 'getData',
                message: `Failed to retrieve data with key '${key}'`
            });
        }

        return data as T;
    }

    public removeData(key: string): void {
        this.data.delete(key);
    }

    public registerShader(shader: ShaderProgram): void {
        this.renderer.createShaderProgram(shader);
    }

    public start(state: string): void {
        this.config?.init?.();

        this.switchToState(state);

        this.run();
    }

    private run(): void {
        const now = Date.now();

        this.frameDetla = now - this.lastFrameTime;
        this.lastFrameTime = now;

        this.renderer.clearScreen();

        this.systems.forEach((s) => {
            s.tick(this, this.frameDetla);
        });

        if (this.currentState) {
            this.currentState.tick(this, this.frameDetla);
        }

        this.world.tick(this.frameDetla);
        this.ui.tick(this.frameDetla);
        this.font.tick(this.frameDetla);

        this.world.render();
        this.ui.render();
        this.font.render();

        if (this.config?.debugMode) {
            this.debugData.frameCount++;

            if (this.debugData.frameCount % 10 === 0) {
                this.debugData.frameCount = 0;
                this.debugData.fps = (1000 / this.frameDetla).toFixed(1);
            }
        }

        requestAnimationFrame(this.run.bind(this));
    }
}
