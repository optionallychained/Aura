import { Color, Component, Entity, Geometry, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createRect = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rect',
        components: [
            // custom ColorPerVertex Component with 6 colors
            // 1 per vertex of a rectangle
            new ColorPerVertex([
                new Color(255, 0, 0),
                new Color(0, 255, 0),
                new Color(0, 0, 255),
                new Color(255, 255, 0),
                new Color(0, 255, 255),
                new Color(255, 0, 255)
            ]),

            // built-in Transform, providing a position in the world
            new Component.Transform(new Vec2(), new Vec2()),

            // built-in Model, utilising the built-in Rect Geometry
            new Component.Model(new Geometry.TwoD.Rect()),

            // built-in Shader, utilising the custom app-level shader
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
