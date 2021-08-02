import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export class Shape extends Entity.Entity {

    constructor(geometry: Geometry.Geometry, position = new Vec2()) {
        super({
            tag: 'box',
            components: [
                new Component.TwoD.Transform2D(position, new Vec2(50, 50)),
                new Component.Generic.Model(geometry),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.Generic.FlatColor(Color.random()),
            ]
        });
    }
}
