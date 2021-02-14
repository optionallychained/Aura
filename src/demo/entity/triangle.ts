import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const triangle = new Entity.Entity({
    tag: 'triangle',
    components: [
        new Component.FlatColor(new Color(0, 255, 0)),
        new Component.Transform(new Vec2(), new Vec2()),

        new Component.Model(new Geometry.TwoD.Triangle()),
        new Component.Shader(Shader.Program.PROGRAM_BASIC.name)
    ]
});
