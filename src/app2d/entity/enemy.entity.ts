import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export class Enemy extends Entity.Entity {

    constructor(position: Vec2, velocity: Vec2) {
        super({
            tag: 'enemy',
            components: [
                new Component.TwoD.Transform2D(position, new Vec2(40, 40), 0, velocity),
                new Component.Generic.Model(Geometry.TwoD.BOX),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.Generic.FlatColor(Color.red()),
                new Component.TwoD.BoxCollider2D()
            ]
        });
    }
}
