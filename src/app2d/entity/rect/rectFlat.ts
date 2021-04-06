import { Color, Component, Core, Entity, Geometry, Shader, Vec2 } from '../../../engine';

export class RectFlat extends Entity.Entity {

    constructor(position: Vec2, scale: Vec2, tag = 'rectFlat') {
        super({
            tag,
            components: [
                new Component.Generic.FlatColor(Color.random()),
                new Component.Generic.Model(Geometry.TwoD.BOX),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}