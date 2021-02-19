import { Color, Component, Entity, Geometry, Random, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createRect = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rect',
        components: [
            // custom ColorPerVertex Component with 6 colors
            // 1 per vertex of a rectangle
            new ColorPerVertex([
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random(),
                Color.random()
            ]),

            // built-in Transform, providing a position in the world
            new Component.Transform(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),

            // built-in Model, utilising the built-in Rect Geometry
            new Component.Model(new Geometry.TwoD.Rect()),

            // built-in Shader, utilising the custom app-level shader
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
