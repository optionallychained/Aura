import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const _createTriangle = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangle',
        components: [
            new Component.FlatColor(color),
            new Component.Transform(new Vec2(), new Vec2()),

            new Component.Model(new Geometry.TwoD.Triangle()),
            new Component.Shader(Shader.Program.PROGRAM_BASIC)
        ]
    });
};
