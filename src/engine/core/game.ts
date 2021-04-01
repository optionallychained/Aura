import { ControlScheme, InputManager } from '../input';
import { Color, Vec2 } from '../math';
import { Renderer } from '../renderer';
import { ShaderProgram } from '../shader/program';
import { State2D, State3D } from '../state';
import { System } from '../system';
import { Font } from '../text';
import { TextureAtlas } from '../texture';
import { UI } from '../ui';
import { World2D } from '../world/world.2d';
import { World3D } from '../world/world.3d';
import { AuraError } from './aura.error';
import { GameConfig } from './game.config';

interface ConfigDefaults {
    backgroundColor: Color;
    canvasDimensions: Vec2;
    controlScheme: ControlScheme;
    fontAtlas: TextureAtlas;
    fontCharset: Array<string>;
}

export abstract class Game {
    public abstract readonly world: World2D | World3D;

    public readonly font: Font;
    public readonly ui: UI;
    public readonly input: InputManager;
    public readonly renderer: Renderer;
    public readonly canvas: HTMLCanvasElement;

    protected readonly states = new Map<string, State2D | State3D>();
    protected currentState: State2D | State3D | undefined;

    // TODO 2D/3D split for Systems?
    protected readonly systems = new Map<string, System>();

    protected frameDelta = 0;
    protected lastFrameTime = 0;

    protected readonly data = new Map<string, unknown>();

    protected debugMode: GameConfig['debugMode'];
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

    protected init: GameConfig['init'];

    constructor(config?: GameConfig) {
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
            renderer: this.renderer,
            textureAtlas: config?.ui?.textureAtlas
        });

        this.font = new Font({
            renderer: this.renderer,
            charset: config?.font?.charset ?? this.defaults.fontCharset,
            textureAtlas: config?.font?.textureAtlas ?? this.defaults.fontAtlas
        });

        this.debugMode = config?.debugMode;
        this.init = config?.init;
    }

    public abstract addState(state: State2D | State3D): void;

    public abstract addStates(...states: Array<State2D | State3D>): void;

    public abstract endState(): void;

    public abstract initState(): void;

    public switchToState(name: string): void {
        this.endState();

        this.currentState = this.states.get(name);

        if (!this.currentState) {
            throw new AuraError({
                class: 'Game',
                method: 'switchToState',
                message: `Failed to switch to State '${name}' : State does not exist`
            });
        }

        this.initState();
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

    public deleteData(key: string): void {
        this.data.delete(key);
    }

    public registerShader(shader: ShaderProgram): void {
        this.renderer.createShaderProgram(shader);
    }

    public start(state: string): void {
        this.init?.();

        this.switchToState(state);

        this.run();
    }

    protected abstract update(): void;

    private run(): void {
        const now = Date.now();

        this.frameDelta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        this.update();

        this.world.tick(this, this.frameDelta);
        this.ui.tick(this, this.frameDelta);
        this.font.tick(this, this.frameDelta);

        this.renderer.clearScreen();

        this.world.render();
        this.ui.render();
        this.font.render();

        if (this.debugMode) {
            this.debugData.frameCount++;

            if (this.debugData.frameCount % 10 === 0) {
                this.debugData.frameCount = 0;
                this.debugData.fps = (1000 / this.frameDelta).toFixed(1);
            }
        }

        requestAnimationFrame(this.run.bind(this));
    }
}
