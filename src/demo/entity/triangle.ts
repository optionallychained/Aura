import { Color, Component, Entity, Geometry, Random, Vec2 } from '../../engine';
import { ColorPerVertex } from '../component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from '../shader/program/colorPerVertex.program';

export const _createTriangle = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'triangle',
        components: [
            // new Component.FlatColor(Color.random()),
            new ColorPerVertex([
                Color.random(),
                Color.random(),
                Color.random()
            ]),
            new Component.Transform(
                new Vec2(Random.between(-1, 1), Random.between(-1, 1)),
                new Vec2(Random.between(0.5, 1.5), Random.between(0.5, 1.5))
            ),

            new Component.Model(new Geometry.TwoD.Triangle()),
            new Component.Shader(PROGRAM_COLOR_PER_VERTEX)
        ]
    });
};
