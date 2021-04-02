import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec2 } from '../../engine';

export class Point2D extends Entity.Entity {

    constructor() {
        super({
            tag: 'point_2d',
            components: [
                new Component.Generic.FlatColor(Color.random()),
                new Component.Generic.Model(Geometry.TwoD.POINT),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(new Vec2(Random.between(-1, 1), Random.between(-1, 1)))
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
