import { Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export const _createCubeSmile = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'cubeSmile',
        components: [
            new Component.Texture(1, 0),
            new Component.ThreeD.Transform3D(
                new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1))

            ),
            new Component.Model(Geometry.ThreeD.BOX),
            new Component.Shader(Shader.Program.ThreeD.PROGRAM_TEXTURE_3D)
        ]
    });
};
