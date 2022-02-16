import { Transform2D } from '../../component/2d';
import { FlatColor, Model, Shader } from '../../component/generic';
import { Entity } from '../../entity';
import { BOX } from '../../geometry/2d';
import { Color, Vec2 } from '../../math';
import { PROGRAM_BASIC_2D } from '../../shader/program/2d';

/**
 * Prefab Entity representing a 2D UI panel, utilised by the UI manager
 */
export class Panel2D extends Entity {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        super({
            tag: 'ui_panel_2d',
            components: [
                new Transform2D(position, scale),
                new Shader(PROGRAM_BASIC_2D),
                new Model(BOX),
                new FlatColor(color)
            ]
        })
    }
}
