import { Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export class CubeFlat extends Entity.Entity {

    constructor() {
        super({
            tag: 'cubeFlat',
            components: [
                new Component.FlatColor(Color.random(true)),
                new Component.Model(Geometry.ThreeD.BOX),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_ORTHO_3D),
                new Component.ThreeD.Transform3D(
                    new Vec3(0, 0),
                    new Vec3(1024 / 2, 768 / 2, 200),

                    // new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                    // new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1)),
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
