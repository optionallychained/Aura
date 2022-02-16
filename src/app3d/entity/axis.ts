import { Transform3D } from '../../aura/component/3d/transform.component.3d';
import { FlatColor } from '../../aura/component/generic/flatColor.component';
import { Model } from '../../aura/component/generic/model.component';
import { Shader } from '../../aura/component/generic/shader.component';
import { Entity } from '../../aura/entity/entity';
import { LINE } from '../../aura/geometry/3d/line.geometry.3d';
import { Angle } from '../../aura/math/angle';
import { Color } from '../../aura/math/color';
import { Vec3 } from '../../aura/math/vec3';
import { PROGRAM_BASIC_3D } from '../../aura/shader/program/3d/basic.program.3d';

export class Axis extends Entity {

    constructor(axis: 'x' | 'y' | 'z', length: number) {
        let angleX, angleY, angleZ;

        switch (axis) {
            case 'x':
                angleX = angleY = angleZ = 0;
                break;

            case 'y':
                angleX = angleY = 0;
                angleZ = Angle.toRadians(90);
                break;

            case 'z':
                angleX = angleZ = 0;
                angleY = Angle.toRadians(90);
                break;
        }

        super({
            tag: 'axis',
            components: [
                new Transform3D(new Vec3(), new Vec3(length, 1, 1), new Vec3(angleX, angleY, angleZ)),
                new Model(LINE),
                new Shader(PROGRAM_BASIC_3D),
                new FlatColor(Color.white()),
            ]
        });
    }
}
