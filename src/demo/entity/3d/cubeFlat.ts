import { Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export class CubeFlat extends Entity.Entity {

    constructor(qx: number, qy: number, qz: number) {
        const position = new Vec3(
            (-1024 / 2) + ((1024 / 4) * qx),
            (-768 / 2) + ((768 / 4) * qy),
            (500 / 2) + ((-500 / 4) * qz)
        );

        super({
            tag: 'cubeFlat',
            components: [
                new Component.FlatColor(Color.random(true)),
                new Component.Model(Geometry.ThreeD.BOX),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    position,
                    new Vec3(1024 / 4, 768 / 4, 150),

                    // new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                    // new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1)),
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
