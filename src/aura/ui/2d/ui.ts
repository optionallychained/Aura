import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { UIManager } from '../ui.manager';
import { Panel } from './panel';
import { UIConfig } from './ui.config';

/**
 * Concrete 2D UI, a UIManager setting out 2D-specific properties and behavior, providing type safety for Aura2D
 */
export class UI extends UIManager<UIConfig> {

    /**
     * Add a 2D Panel to the UI
     *
     * @param position the 2D position of the Panel
     * @param scale the 2D scale of the Panel
     * @param color the Color of the Panel
     */
    public addPanel(position: Vec2, scale: Vec2, color: Color): void {
        this.addEntity(new Panel(position, scale, color));
    }
}
