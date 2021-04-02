import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export class TriangleFlat extends Entity.Entity {

    constructor() {
        super({
            tag: 'triangleFlat',
            components: [
                new Component.Generic.FlatColor(Color.random(true)),
                new Component.Generic.Model(Geometry.TwoD.TRIANGLE),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(
                    new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                    new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
