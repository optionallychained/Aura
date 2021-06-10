import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export class CubeCat extends Entity.Entity {

    constructor() {
        super({
            tag: 'cubeCat',
            components: [
                new Component.Generic.Texture(0, 1),
                new Component.Generic.FlatColor(Color.white(Random.between(0, 1))),
                new Component.Generic.Model(Geometry.ThreeD.BOX),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_TEXTURE_COLORED_3D),
                new Component.ThreeD.Transform3D(
                    new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                    new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1))
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}