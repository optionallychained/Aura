import { Transform3D } from '../../aura/component/3d/transform.component.3d';
import { Model } from '../../aura/component/generic/model.component';
import { MultiColor } from '../../aura/component/generic/multiColor.component';
import { Shader } from '../../aura/component/generic/shader.component';
import { Entity } from '../../aura/entity/entity';
import { Geometry } from '../../aura/geometry/geometry';
import { Angle } from '../../aura/math/angle';
import { Color } from '../../aura/math/color';
import { Random } from '../../aura/math/random';
import { Vec3 } from '../../aura/math/vec3';
import { PROGRAM_COLOR_PER_VERTEX_3D } from '../../aura/shader/program/3d/colorPerVertex.program.3d';
import { PROGRAM_FRONT_TEST } from '../shader/program/frontTest.program';

export class Shape extends Entity {

    private rotations = [
        Angle.toRadians(Random.between(-3, 3)),
        Angle.toRadians(Random.between(-3, 3)),
        Angle.toRadians(Random.between(-3, 3))
    ];

    constructor(geometry: Geometry, position = new Vec3(), scale = 100) {
        super({
            tag: 'shape',
            components: [
                new Transform3D(position, new Vec3(scale, scale, scale)),
                new Model(geometry),
                new Shader(PROGRAM_COLOR_PER_VERTEX_3D),
                new MultiColor(Color.randomList(30)),
                // new Shader(PROGRAM_FRONT_TEST)
            ]
        })
    }

    public tick(): void {
        this.getComponent<Transform3D>('Transform3D').rotate(
            new Vec3(this.rotations[0], this.rotations[1], this.rotations[2])
        );
    }
}
