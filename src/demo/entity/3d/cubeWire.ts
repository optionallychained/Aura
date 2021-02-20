import { Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export const _createCubeWire = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'cubeWire',
        components: [
            new Component.MultiColor([
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random()
            ]),
            new Component.ThreeD.Transform3D(
                new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1)),
            ),
            new Component.Model(Geometry.ThreeD.Wireframe.BOX),
            new Component.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
