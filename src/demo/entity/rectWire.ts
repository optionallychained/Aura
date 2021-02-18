import { Color, Component, Entity, Geometry, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createRectWire = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rectWire',
        components: [
            new ColorPerVertex([new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255), new Color(255, 255, 0)]),
            new Component.Transform(new Vec2(), new Vec2()),

            new Component.Model(new Geometry.TwoD.Wireframe.Rect()),
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });

};
