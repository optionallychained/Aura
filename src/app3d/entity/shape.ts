import { Color, Component, Entity, Geometry, Shader, Vec3 } from '../../engine';

export class Shape extends Entity.Entity {

    constructor(geometry: Geometry.Geometry, position = new Vec3()) {
        super({
            tag: 'shape',
            components: [
                new Component.ThreeD.Transform3D(position, new Vec3(100, 100, 100)),
                new Component.Generic.Model(geometry),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D),
                new Component.Generic.MultiColor(Color.randomList(6))
            ]
        })
    }
}
