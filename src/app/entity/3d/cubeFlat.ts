import { Color, Component, Entity, Geometry, Shader, Vec3 } from '../../../engine';

export class CubeFlat extends Entity.Entity {

    constructor(position: Vec3, scale: Vec3) {
        super({
            tag: 'cubeFlat',
            components: [
                new Component.FlatColor(Color.random(true)),
                new Component.Model(Geometry.ThreeD.BOX),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
