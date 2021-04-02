import { Color, Component, Core, Entity, Geometry, Shader, Vec3 } from '../../../engine';

export class CubeFlat extends Entity.Entity {

    constructor(position: Vec3, scale: Vec3) {
        super({
            tag: 'cubeFlat',
            components: [
                new Component.Generic.FlatColor(Color.random()),
                new Component.Generic.Model(Geometry.ThreeD.BOX),
                new Component.Generic.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
