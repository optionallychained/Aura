import { ControlScheme } from '../input/controlScheme.type';
import { Color, Vec2 } from '../math';
import { FontConfig } from '../text/font.config';
import { UIConfig } from '../ui';
import { WorldConfig2D, WorldConfig3D } from '../world';

export interface GameConfig {
    readonly canvasDimensions?: Vec2;
    readonly canvasId?: string;
    readonly backgroundColor?: Color;
    readonly controlScheme?: ControlScheme;
    readonly debugMode?: boolean;
    readonly ui?: Omit<UIConfig, 'game'>;
    readonly font?: Omit<FontConfig, 'game'>;
    readonly init?: () => void;
}

export interface GameConfig2D extends GameConfig {
    readonly world?: Partial<Omit<WorldConfig2D, 'game'>>;
}

export interface GameConfig3D extends GameConfig {
    readonly world?: Partial<Omit<WorldConfig3D, 'game'>>;
}
