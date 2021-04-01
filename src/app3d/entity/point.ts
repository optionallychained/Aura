import { Color, Component, Core, Entity, Geometry, Random, Shader, Vec3 } from '../../engine';

export class Point3D extends Entity.Entity {

    constructor() {
        super({
            tag: 'point_3d',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.ThreeD.POINT),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    new Vec3(Random.between(-1, 1), Random.between(-1, 1), 0.5),
                    new Vec3(Random.between(0.5, 1.5), Random.between(0.5, 1.5), 0.5)
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
