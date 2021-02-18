import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../engine';
import { FlatColor } from '../../engine/component';

export const _createTriangle = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangle',
        components: [
            new FlatColor(color),
            // new ColorPerVertex([new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255)]),
            new Component.Transform(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),

            new Component.Model(new Geometry.TwoD.Triangle()),
            new Component.Shader(Shader.Program.PROGRAM_BASIC)
        ]
    });
};
