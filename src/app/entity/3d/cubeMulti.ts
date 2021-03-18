import { Color, Component, Entity, Geometry, Random, Shader, Vec3 } from '../../../engine';

export class CubeMulti extends Entity.Entity {

    constructor(position: Vec3, scale: Vec3) {
        super({
            tag: 'cubeMulti',
            components: [
                new Component.MultiColor(Color.randomList(12)),
                new Component.Model(Geometry.ThreeD.BOX),
                new Component.Shader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_PERSPECTIVE_3D),
                new Component.ThreeD.Transform3D(
                    position,
                    scale
                )
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
