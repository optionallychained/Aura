import { Angle, Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../engine';
import { PROGRAM_FRONT_TEST } from '../shader/program/frontTest.program';

export class Shape extends Entity.Entity {

    private rotations = [
        Angle.toRadians(Random.between(-3, 3)),
        Angle.toRadians(Random.between(-3, 3)),
        Angle.toRadians(Random.between(-3, 3))
    ];

    constructor(geometry: Geometry.Geometry, position = new Vec3(), scale = 100) {
        super({
            tag: 'shape',
            components: [
                new Component.ThreeD.Transform3D(position, new Vec3(scale, scale, scale)),
                new Component.Generic.Model(geometry),
                // new Component.Generic.Shader(PROGRAM_FRONT_TEST),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D),
                new Component.Generic.MultiColor(Color.randomList(30))
            ]
        })
    }

    public tick(): void {
        // this.getComponent<Component.ThreeD.Transform3D>('Transform3D').rotate(
        //     new Vec3(this.rotations[0], this.rotations[1], this.rotations[2])
        // );
    }
}
