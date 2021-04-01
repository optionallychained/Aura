import { Color, Vec2 } from '../../math';
import { UI } from '../ui';
import { Panel2D } from './panel.2d';

export class UI2D extends UI {

    public addPanel(position: Vec2, scale: Vec2, color: Color): void {
        this.addEntity(new Panel2D(position, scale, color));
    }
}
