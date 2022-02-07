import { Angle, Color, Component, Entity, Geometry, Shader, Vec3 } from '../../engine';

export class Axis extends Entity.Entity {

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
                new Component.ThreeD.Transform3D(new Vec3(), new Vec3(length, 1, 1), new Vec3(angleX, angleY, angleZ)),
                new Component.Generic.Model(Geometry.ThreeD.LINE),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_3D),
                new Component.Generic.FlatColor(Color.white()),
            ]
        });
    }
}
