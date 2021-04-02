import { Color, Vec3 } from '../../math';
import { UI } from '../ui';
import { UIConfig3D } from '../ui.config';
import { Panel3D } from './panel.3d';

/**
 * Concrete UI3D, a UI EntityManager setting out the 3D-specific properties and behavior of UI object management for 3D Games
 *
 * Implements and type-narrows the abstract elements of the parent class UI so as to produce consumer type-safety on things like Panel
 *   management
 */
export class UI3D extends UI<UIConfig3D> {

    /**
     * Concrete Panel addition routine, narrowing the generic types to ensure the correct configuration of a UI3D
     *
     * @param position the Vec3 position of the panel
     * @param scale the Vec3 scale of the panel
     * @param color the Color of the panel
     */
    public addPanel(position: Vec3, scale: Vec3, color: Color): void {
        this.addEntity(new Panel3D(position, scale, color));
    }
}
