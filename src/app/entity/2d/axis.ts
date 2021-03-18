import { Angle, Color, Component, Entity, Geometry, Shader, Vec2 } from '../../../engine';

export class Axis2D extends Entity.Entity {

    constructor(direction: number, offsetX: number, offsetY: number, length: number) {
        const position = new Vec2(offsetX, offsetY);
        const scale = new Vec2(length, 1);

        super({
            tag: 'axis2D',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.TwoD.LINE),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(position, scale, direction)
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
