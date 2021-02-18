import { Color, Component, Entity, Geometry, Random, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createRectWire = (color: Color): Entity.Entity => {
    return new Entity.Entity({
        tag: 'rectWire',
        components: [
            new ColorPerVertex([new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255), new Color(255, 255, 0)]),
            new Component.Transform(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),

            new Component.Model(new Geometry.TwoD.Wireframe.Rect()),
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });

};
