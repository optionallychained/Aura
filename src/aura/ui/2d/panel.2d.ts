import { Transform2D } from '../../component/2d/transform.component.2d';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Entity } from '../../entity/entity';
import { SQUARE } from '../../geometry/2d/square.geometry.2d';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { PROGRAM_BASIC_2D } from '../../shader/program/2d/basic.program.2d';

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
                new Model(SQUARE),
                new FlatColor(color)
            ]
        })
    }
}
