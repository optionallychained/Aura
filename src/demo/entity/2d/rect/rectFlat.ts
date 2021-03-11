import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../../../engine';

export class RectFlat extends Entity.Entity {

    constructor(qx: number, qy: number) {
        const position = new Vec2(
            (-1024 / 2) + ((1024 / 4) * qx),
            (-768 / 2) + ((768 / 4) * qy)
        );

        super({
            tag: 'rectFlat',
            components: [
                new Component.FlatColor(Color.random()),
                new Component.Model(Geometry.TwoD.BOX),
                new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.TwoD.Transform2D(
                    position,
                    new Vec2(1024 / 4, 1024 / 4),
                )
            ]
        });
    }
}
