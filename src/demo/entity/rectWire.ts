import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const rectWire = new Entity.Entity({
    tag: 'rectWire',
    components: [
        new Component.FlatColor(new Color(0, 0, 255)),
        new Component.Transform(new Vec2(), new Vec2()),

        new Component.Model(new Geometry.TwoD.Wireframe.Rect()),
        new Component.Shader(Shader.Program.PROGRAM_BASIC.name)
    ]
});
