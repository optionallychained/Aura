import { Color, Component, Entity, Geometry, Random, Shader, Vec2, Vec4 } from '../../../engine';

export const _createRect = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rect',
        components: [
            // new Component.MultiColor([
            //     Color.random(),
            //     Color.random(),
            //     Color.random(),
            //     Color.random(),
            //     Color.random(),
            //     Color.random()
            // ]),
            new Component.Texture('world', [
                new Vec2(0, 0),
                new Vec2(1, 0),
                new Vec2(1, 1),
                new Vec2(1, 1),
                new Vec2(0, 1),
                new Vec2(0, 0)
            ]),
            new Component.TwoD.Transform2D(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.BOX),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_TEXTURE)
        ]
    });
};
