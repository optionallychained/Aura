import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../../engine';

export const _createRectMulti = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rectMulti',
        components: [
            new Component.MultiColor([
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random()
            ]),
            new Component.TwoD.Transform2D(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.BOX),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D)
        ]
    });
};
