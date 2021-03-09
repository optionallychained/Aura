import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../../engine';

export const _createLine2D = (angle: number): Entity.Entity => {
    return new Entity.Entity({
        tag: 'line_2d',
        components: [
            new Component.FlatColor(Color.random()),
            new Component.TwoD.Transform2D(
                new Vec2(),
                new Vec2(1024 * 4, 1),
                angle
            ),
            new Component.Model(Geometry.TwoD.LINE),
            new Component.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D)
        ]
    });
};
