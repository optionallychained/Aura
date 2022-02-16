import { Entity, Angle, Geometry, Vec3, Transform, Model, Shader, MultiColor, Color, ShaderPrograms, Random } from '../../aura/index.3d';
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
                new Transform(position, new Vec3(scale, scale, scale)),
                new Model(geometry),
                new Shader(ShaderPrograms.COLOR_PER_VERTEX),
                new MultiColor(Color.randomList(30)),
                // new Shader(PROGRAM_FRONT_TEST)
            ]
        })
    }

    public tick(): void {
        this.getComponent<Transform>('Transform3D').rotate(
            new Vec3(this.rotations[0], this.rotations[1], this.rotations[2])
        );
    }
}
