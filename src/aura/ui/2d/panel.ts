import { Transform } from '../../component/2d/transform.component';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Entity } from '../../entity/entity';
import { SQUARE } from '../../geometry/2d/square.geometry';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { PROGRAM_BASIC } from '../../shader/program/2d/basic.program';

/**
 * Prefab Entity representing a 2D UI panel, utilised by the 2D UIManager
 */
export class Panel extends Entity {

    /**
     * Constructor. Configure a basic Entity representing a 2D Panel
     *
     * @param position the 2D position of the Panel
     * @param scale the 2D scale of the Panel
     * @param color the Color of the Panel
     */
    constructor(position: Vec2, scale: Vec2, color: Color) {
        super({
            tag: 'panel',
            components: [
                new Transform(position, scale),
                new Shader(PROGRAM_BASIC),
                new Model(SQUARE),
                new FlatColor(color)
            ]
        })
    }
}
