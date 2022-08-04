import { Geometries, Keys, Random, State, Vec2 } from '../../aura/aura.2d';
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

        const { x, y } = game.world.dimensions;

        for (let i = -x / 2 + shapeScale / 2; i <= x / 2 - shapeScale / 2; i += shapeScale) {
            for (let j = -y / 2 + shapeScale / 2; j <= y / 2 - shapeScale / 2; j += shapeScale) {
                const geometry = geometries[Math.floor(Random.between(0, geometries.length))];

                game.world.addEntity(new Shape(geometry, new Vec2(i, j), shapeScale));
            }
        }
    },
    end: () => { },
    tick: (game) => {
        if (game.input.isKeyDown(Keys.D)) {
            game.world.activeCamera.moveRight(5);
        }
        else if (game.input.isKeyDown(Keys.A)) {
            game.world.activeCamera.moveRight(-5);
        }

        if (game.input.isKeyDown(Keys.W)) {
            game.world.activeCamera.moveUp(5);
        }
        else if (game.input.isKeyDown(Keys.S)) {
            game.world.activeCamera.moveUp(-5);
        }


        if (game.input.isKeyDown(Keys.F)) {
            void game.canvas!.requestFullscreen();
        }

        window.addEventListener('touchstart', () => {
            void game.canvas!.requestFullscreen();
        })
    }
});
