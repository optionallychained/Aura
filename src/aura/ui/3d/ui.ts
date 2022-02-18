import { Color } from '../../math/color';
import { Vec3 } from '../../math/vec3';
import { UIManager } from '../ui.manager';
import { Panel } from './panel';
import { UIConfig } from './ui.config';

/**
 * Concrete 2D UI, a UIManager setting out 3D-specific properties and behavior, providing type safety for Aura3D
 */
export class UI extends UIManager<UIConfig> {

    /**
     * Add a 3D Panel to the UI
     *
     * @param position the 3D position of the Panel
     * @param scale the 3D scale of the Panel
     * @param color the Color of the Panel
     */
    public addPanel(position: Vec3, scale: Vec3, color: Color): void {
        this.addEntity(new Panel(position, scale, color));
    }
}
