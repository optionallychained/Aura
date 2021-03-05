import { Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../../engine';

export const _createTriangleCat = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangleCat',
        components: [
            new Component.Texture(0, 1),
            new Component.TwoD.Transform2D(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.TRIANGLE),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_TEXTURE_2D)
        ]
    });
};
