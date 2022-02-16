import { Transform3D } from '../../component/3d/transform.component.3d';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Entity } from '../../entity/entity';
import { BOX } from '../../geometry/3d/box.geometry.3d';
import { Color } from '../../math/color';
import { Vec3 } from '../../math/vec3';
import { PROGRAM_BASIC_3D } from '../../shader/program/3d/basic.program.3d';

/**
 * Prefab Entity representing a 3D UI panel, utilised by the UI manager
 */
export class Panel3D extends Entity {

    constructor(position: Vec3, scale: Vec3, color: Color) {
        super({
            tag: 'ui_panel_3d',
            components: [
                new Transform3D(position, scale),
                new Shader(PROGRAM_BASIC_3D),
                new Model(BOX),
                new FlatColor(color)
            ]
        })
    }
}
