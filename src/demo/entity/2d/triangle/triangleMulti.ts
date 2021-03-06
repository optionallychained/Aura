import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../../engine';

export const _createTriangleMulti = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangleMulti',
        components: [
            new Component.MultiColor(Color.randomList(3)),
            new Component.TwoD.Transform2D(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.TRIANGLE),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D)
        ]
    });
};
