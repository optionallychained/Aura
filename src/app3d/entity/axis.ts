import { Angle, Color, Component, Entity, Geometry, Shader, Vec2, Vec3 } from '../../engine';

export class Axis3D extends Entity.Entity {

    constructor(axis: 'x' | 'y' | 'z', offset: Vec3, length: number) {
        let angleX, angleY, angleZ;

        // TODO axis rotation
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
            tag: 'axis3D',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.ThreeD.LINE),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    offset,
                    new Vec3(length, 1, 1),
                    new Vec3(angleX, angleY, angleZ)
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
