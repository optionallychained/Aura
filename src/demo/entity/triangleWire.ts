import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const triangleWire = new Entity.Entity({
    tag: 'triangleWire',
    components: [
        new Component.FlatColor(new Color(255, 0, 255)),
        new Component.Transform(new Vec2(), new Vec2()),

        new Component.Model(new Geometry.TwoD.Wireframe.Triangle()),
        new Component.Shader(Shader.Program.PROGRAM_BASIC)
    ]
});
