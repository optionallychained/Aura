import { Color, Vec2 } from '../../math';
import { UI } from '../ui';
import { Panel2D } from './panel.2d';
import { UI2DConfig } from './ui.2d.config';

/**
 * Concrete UI2D, a UI EntityManager setting out the 2D-specific properties and behavior of UI object management for 2D Games
 *
 * Implements and type-narrows the abstract elements of the parent class UI so as to produce consumer type-safety on things like Panel
 *   management
 */
export class UI2D extends UI<UI2DConfig> {

    /**
     * Concrete Panel addition routine, narrowing the generic types to ensure the correct configuration of a UI2D
     *
     * @param position the Vec2 position of the panel
     * @param scale the Vec2 scale of the panel
     * @param color the Color of the panel
     */
    public addPanel(position: Vec2, scale: Vec2, color: Color): void {
        this.addEntity(new Panel2D(position, scale, color));
    }
}
