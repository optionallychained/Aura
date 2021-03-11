import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../../engine';

export class Axis2D extends Entity.Entity {

    constructor(angle: number) {
        super({
            tag: 'axis2D',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.TwoD.LINE),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(new Vec2(), new Vec2(1024 * 4, 1), angle)
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
