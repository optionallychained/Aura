import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export class RectCat extends Entity.Entity {

    constructor() {
        super({
            tag: 'rectCat',
            components: [
                new Component.Texture(0, 1),
                new Component.FlatColor(new Color(255, 255, 255, Random.between(0, 1))),
                new Component.Model(Geometry.TwoD.BOX),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_TEXTURE_COLORED_2D),
                new Component.TwoD.Transform2D(
                    new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                    new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}

