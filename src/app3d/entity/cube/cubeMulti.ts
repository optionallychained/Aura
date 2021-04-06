import { Color, Component, Core, Entity, Geometry, Shader, Vec3 } from '../../../engine';

export class CubeMulti extends Entity.Entity {

    constructor(position: Vec3, scale: Vec3, tag = 'cubeMulti') {
        super({
            tag,
            components: [
                new Component.Generic.MultiColor(Color.randomList(12)),
                new Component.Generic.Model(Geometry.ThreeD.BOX),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D),
                new Component.ThreeD.Transform3D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
