import { Geometries, Random, State, Vec2 } from '../../aura/index.2d';
import { Shape } from '../entity/shape.entity';

export const SHAPES_STATE = new State({
    name: 'shapes',
    init: (game) => {
        const shapeScale = 50;

        const geometries = [
            Geometries.SQUARE,
            Geometries.CIRCLE,
            Geometries.F,
            Geometries.HEXAGON,
            Geometries.LINE,
            Geometries.OCTAGON,
            Geometries.PENTAGON,
            Geometries.TRIANGLE,
            Geometries.TRIANGLE_RIGHT_ANGLE,
            Geometries.Wireframe.SQUARE,
            Geometries.Wireframe.CIRCLE,
            Geometries.Wireframe.F,
            Geometries.Wireframe.HEXAGON,
            Geometries.Wireframe.OCTAGON,
            Geometries.Wireframe.PENTAGON,
            Geometries.Wireframe.TRIANGLE,
            Geometries.Wireframe.TRIANGLE_RIGHT_ANGLE
        ];

        for (let i = -game.world.dimensions.x / 2; i <= game.world.dimensions.x / 2; i += shapeScale) {
            for (let j = -game.world.dimensions.y / 2; j <= game.world.dimensions.y / 2; j += shapeScale) {
                const geometry = geometries[Math.floor(Random.between(0, geometries.length))];

                game.world.addEntity(new Shape(geometry, new Vec2(i, j), shapeScale * 0.75));
            }
        }
    },
    end: () => { },
    tick: () => { }
});
