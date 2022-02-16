import { Entity, Angle, Transform, Vec3, Color, Geometries, Model, Shader, FlatColor, ShaderPrograms } from '../../aura/index.3d';

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
                new Transform(new Vec3(), new Vec3(length, 1, 1), new Vec3(angleX, angleY, angleZ)),
                new Model(Geometries.LINE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white()),
            ]
        });
    }
}
