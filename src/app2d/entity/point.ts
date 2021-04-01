import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../engine';


export class Point2D extends Entity.Entity {

    constructor() {
        super({
            tag: 'point_2d',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.TwoD.POINT),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(new Vec2(Random.between(-1, 1), Random.between(-1, 1)))
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
