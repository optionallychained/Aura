import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export const _createRectWire = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rectWire',
        components: [
            new Component.FlatColor(color),
            new Component.Transform(new Vec2(), new Vec2()),

            new Component.Model(new Geometry.TwoD.Wireframe.Rect()),
            new Component.Shader(Shader.Program.PROGRAM_BASIC)
        ]
    });

};
