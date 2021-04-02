import { Color, Component, Core, Entity, Geometry, Shader, Vec2 } from '../../engine';

export class Axis2D extends Entity.Entity {

    constructor(direction: number, offsetX: number, offsetY: number, length: number) {
        const position = new Vec2(offsetX, offsetY);
        const scale = new Vec2(length, 1);

        super({
            tag: 'axis2D',
            components: [
                new Component.Generic.FlatColor(Color.random()),
                new Component.Generic.Model(Geometry.TwoD.LINE),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(position, scale, direction)
            ]
        });
    }

    public tick(game: Core.Game, frameDelta: number): void { }
}
