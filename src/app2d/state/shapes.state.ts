import { SQUARE } from '../../aura/geometry/2d/square.geometry.2d';
import { CIRCLE } from '../../aura/geometry/2d/circle.geometry.2d';
import { F } from '../../aura/geometry/2d/f.geometry.2d';
import { HEXAGON } from '../../aura/geometry/2d/hexagon.geometry.2d';
import { LINE } from '../../aura/geometry/2d/line.geometry.2d';
import { OCTAGON } from '../../aura/geometry/2d/octagon.geometry.2d';
import { State2D } from '../../aura/state/2d/state.2d';
import { Shape } from '../entity/shape.entity';
import { PENTAGON } from '../../aura/geometry/2d/pentagon.geometry.2d';
import { TRIANGLE } from '../../aura/geometry/2d/triangle.geometry.2d';
import { TRIANGLE_RIGHT_ANGLE } from '../../aura/geometry/2d/triangleright.geometry.2d';
import { SQUARE_WIREFRAME } from '../../aura/geometry/2d/wireframe/square.wireframe.geometry.2d';
import { CIRCLE_WIREFRAME } from '../../aura/geometry/2d/wireframe/circle.wireframe.geometry.2d';
import { F_WIREFRAME } from '../../aura/geometry/2d/wireframe/f.wireframe.geometry.2d';
import { HEXAGON_WIREFRAME } from '../../aura/geometry/2d/wireframe/hexagon.wireframe.geometry.2d';
import { OCTAGON_WIREFRAME } from '../../aura/geometry/2d/wireframe/octagon.wireframe.geometry.2d';
import { PENTAGON_WIREFRAME } from '../../aura/geometry/2d/wireframe/pentagon.wireframe.geometry.2d';
import { TRIANGLE_WIREFRAME } from '../../aura/geometry/2d/wireframe/triangle.wireframe.geometry.2d';
import { TRIANGLE_RIGHT_ANGLE_WIREFRAME } from '../../aura/geometry/2d/wireframe/triangleright.wireframe.geometry.2d';
import { Random } from '../../aura/math/random';
import { Vec2 } from '../../aura/math/vec2';

export const SHAPES_STATE = new State2D({
    name: 'shapes',
    init: (game) => {
        const shapeScale = 50;

        const geometries = [
            SQUARE,
            CIRCLE,
            F,
            HEXAGON,
            LINE,
            OCTAGON,
            PENTAGON,
            TRIANGLE,
            TRIANGLE_RIGHT_ANGLE,
            SQUARE_WIREFRAME,
            CIRCLE_WIREFRAME,
            F_WIREFRAME,
            HEXAGON_WIREFRAME,
            OCTAGON_WIREFRAME,
            PENTAGON_WIREFRAME,
            TRIANGLE_WIREFRAME,
            TRIANGLE_RIGHT_ANGLE_WIREFRAME
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
