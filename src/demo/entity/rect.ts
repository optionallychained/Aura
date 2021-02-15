import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const _createRect = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rect',
        components: [
            new Component.FlatColor(new Color(255, 0, 0)),
            new Component.Transform(new Vec2(), new Vec2()),

            new Component.Model(new Geometry.TwoD.Rect()),
            new Component.Shader(Shader.Program.PROGRAM_BASIC)
        ]
    });
};
