import { Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export const _createCubeCat = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'cubeCat',
        components: [
            new Component.Texture(0, 1),
            new Component.ThreeD.Transform3D(
                new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1))

            ),
            new Component.Model(Geometry.ThreeD.BOX),
            new Component.Shader(Shader.Program.ThreeD.PROGRAM_TEXTURE)
        ]
    });
};
