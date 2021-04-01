import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export class TriangleMulti extends Entity.Entity {

    constructor() {
        super({
            tag: 'triangleMulti',
            components: [
                new Component.MultiColor(Color.randomList(3, true)),
                new Component.Model(Geometry.TwoD.TRIANGLE),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D),
                new Component.TwoD.Transform2D(
                    new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                    new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
