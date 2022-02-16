import { Transform3D } from '../../component/3d';
import { FlatColor, Model, Shader } from '../../component/generic';
import { Entity } from '../../entity';
import { BOX } from '../../geometry/3d';
import { Color, Vec3 } from '../../math';
import { PROGRAM_BASIC_3D } from '../../shader/program/3d';

/**
 * Prefab Entity representing a 3D UI panel, utilised by the UI manager
 */
export class Panel3D extends Entity {

    constructor(position: Vec3, scale: Vec3, color: Color) {
        super({
            tag: 'ui_panel_2d',
            components: [
                new Transform3D(position, scale),
                new Shader(PROGRAM_BASIC_3D),
                new Model(BOX),
                new FlatColor(color)
            ]
        })
    }
}
