import { Transform } from '../../component/3d/transform.component';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Entity } from '../../entity/entity';
import { CUBE } from '../../geometry/3d/cube.geometry';
import { Color } from '../../math/color';
import { Vec3 } from '../../math/vec3';
import { PROGRAM_BASIC } from '../../shader/program/3d/basic.program';

/**
 * Prefab Entity representing a 3D UI panel, utilised by the 3D UIManager
 */
export class Panel extends Entity {

    /**
     * Constructor. Configure a basic Entity representing a 3D Panel
     *
     * @param position the 3D position of the Panel
     * @param scale the 3D scale of the Panel
     * @param color the Color of the Panel
     */
    constructor(position: Vec3, scale: Vec3, color: Color) {
        super({
            tag: 'panel',
            components: [
                new Transform(position, scale),
                new Shader(PROGRAM_BASIC),
                new Model(CUBE),
                new FlatColor(color)
            ]
        })
    }
}
