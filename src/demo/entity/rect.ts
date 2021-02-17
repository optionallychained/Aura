import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createRect = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rect',
        components: [
            new ColorPerVertex([new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255), new Color(255, 255, 0), new Color(0, 255, 255), new Color(255, 0, 255)]),
            new Component.Transform(new Vec2(), new Vec2()),

            new Component.Model(new Geometry.TwoD.Rect()),
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
