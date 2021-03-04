import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export const _createTriangleWireTextured = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangleWireTextured',
        components: [
            new Component.Texture(0, 0),
            new Component.TwoD.Transform2D(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),
            new Component.Model(Geometry.TwoD.Wireframe.TRIANGLE),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_TEXTURE)
        ]
    });
};
