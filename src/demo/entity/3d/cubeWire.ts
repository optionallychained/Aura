import { Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export class CubeWire extends Entity.Entity {

    constructor() {
        super({
            tag: 'cubeWire',
            components: [
                new Component.MultiColor(Color.randomList(8, false, Random.between(0, 1))),
                new Component.Model(Geometry.ThreeD.Wireframe.BOX),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D),
                new Component.ThreeD.Transform3D(
                    new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                    new Vec3(Random.between(0.1, 1), Random.between(0.1, 1), Random.between(0.1, 1))
                )
            ]
        });
    }
}
