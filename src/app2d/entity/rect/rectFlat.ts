import { Angle, Color, Component, Entity, Geometry, Shader, Vec2 } from '../../../engine';

export class RectFlat extends Entity.Entity {

    constructor(position: Vec2, scale: Vec2) {
        super({
            tag: 'rectFlat',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.TwoD.BOX),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
