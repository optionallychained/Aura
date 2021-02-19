import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../engine';

export const _createTriangleWire = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangleWire',
        components: [
            new Component.MultiColor([
                Color.random(),
                Color.random(),
                Color.random()
            ]),
            new Component.Transform(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(new Geometry.TwoD.Wireframe.Triangle()),
            new Component.Shader(Shader.Program.PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
