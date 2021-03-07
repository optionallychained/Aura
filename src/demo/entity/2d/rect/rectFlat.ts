import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../../engine';

export const _createRectFlat = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rectFlat',
        components: [
            new Component.FlatColor(Color.random(true)),
            new Component.TwoD.Transform2D(
                new Vec2(0, 0),
                new Vec2(500, 500),
                // new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                // new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.BOX),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D)
        ]
    });
};
