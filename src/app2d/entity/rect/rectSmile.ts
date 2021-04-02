import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export class RectSmile extends Entity.Entity {

    constructor() {
        super({
            tag: 'rectSmile',
            components: [
                new Component.Generic.Texture(1, 0),
                new Component.Generic.FlatColor(new Color(255, 255, 255, Random.between(0, 1))),
                new Component.Generic.Model(Geometry.TwoD.BOX),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_TEXTURE_COLORED_2D),
                new Component.TwoD.Transform2D(
                    new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                    new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
