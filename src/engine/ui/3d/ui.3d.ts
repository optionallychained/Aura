import { Color, Vec3 } from '../../math';
import { UI } from '../ui';
import { Panel3D } from './panel.3d';

export class UI3D extends UI {

    public addPanel(position: Vec3, scale: Vec3, color: Color): void {
        this.addEntity(new Panel3D(position, scale, color));
    }
}
