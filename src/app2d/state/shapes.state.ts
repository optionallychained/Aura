import { Geometry, Random, State, Vec2 } from '../../engine';
import { Shape } from '../entity/shape.entity';

export const SHAPES_STATE = new State.TwoD.State2D({
    name: 'shapes',
    init: (game) => {
        const shapeScale = 50;

        const geometries = [
            Geometry.TwoD.BOX,
            Geometry.TwoD.CIRCLE,
            Geometry.TwoD.F,
            Geometry.TwoD.HEXAGON,
            Geometry.TwoD.LINE,
            Geometry.TwoD.OCTAGON,
            Geometry.TwoD.PENTAGON,
            Geometry.TwoD.TRIANGLE,
            Geometry.TwoD.TRIANGLE_RIGHT_ANGLE,
            Geometry.TwoD.Wireframe.BOX,
            Geometry.TwoD.Wireframe.CIRCLE,
            Geometry.TwoD.Wireframe.F,
            Geometry.TwoD.Wireframe.HEXAGON,
            Geometry.TwoD.Wireframe.OCTAGON,
            Geometry.TwoD.Wireframe.PENTAGON,
            Geometry.TwoD.Wireframe.TRIANGLE,
            Geometry.TwoD.Wireframe.TRIANGLE_RIGHT_ANGLE
        ];

        for (let i = -game.world.dimensions.x / 2; i < game.world.dimensions.x / 2; i += shapeScale) {
            for (let j = -game.world.dimensions.x / 2; j <= game.world.dimensions.y / 2; j += shapeScale) {
                const geometry = geometries[Math.floor(Random.between(0, geometries.length))];

                game.world.addEntity(new Shape(geometry, new Vec2(i, j), shapeScale * 0.75));
            }
        }
    },
    end: () => { },
    tick: () => { }
});
